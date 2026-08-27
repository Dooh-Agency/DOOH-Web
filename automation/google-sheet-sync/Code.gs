/**
 * Sincronización manual y sin costo adicional para la grilla DOOH.
 *
 * Instalación: ver SETUP.md en esta misma carpeta.
 * Las claves quedan sólo en Script Properties de Google Apps Script.
 */

// Versión actual: admite un cover explícito para previsualizar videos sin depender de su primer fotograma.
const PLANNER_SYNC_VERSION = '2026.08.27.4';

const PLANNER_CONFIG = {
  sheetName: 'Grilla semanal',
  headerRow: 4,
  supabaseTable: 'content_items',
  assetsTable: 'content_item_assets',
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Planificador DOOH')
    .addItem('Sincronizar con Supabase', 'syncPlanner')
    .addToUi();
}

function syncPlanner() {
  const properties = PropertiesService.getScriptProperties().getProperties();
  const supabaseUrl = removeTrailingSlash_(properties.SUPABASE_URL);
  const serviceRoleKey = properties.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en Script Properties. Ver SETUP.md.');
  }

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(PLANNER_CONFIG.sheetName);
  if (!sheet) {
    throw new Error(`No se encontró la hoja “${PLANNER_CONFIG.sheetName}”.`);
  }

  const lastColumn = sheet.getLastColumn();
  const headers = sheet.getRange(PLANNER_CONFIG.headerRow, 1, 1, lastColumn).getDisplayValues()[0];
  const headerIndex = indexHeaders_(headers);
  const requiredHeaders = ['Pieza', 'Canal', 'Formato', 'Objetivo', 'Tema', 'Copy ES', 'Copy EN', 'Dirección visual', 'Estado'];
  requiredHeaders.forEach((header) => {
    if (headerIndex[header] === undefined) {
      throw new Error(`Falta el encabezado obligatorio “${header}” en la fila ${PLANNER_CONFIG.headerRow}.`);
    }
  });

  const lastRow = sheet.getLastRow();
  if (lastRow <= PLANNER_CONFIG.headerRow) {
    SpreadsheetApp.getUi().alert('No hay piezas para sincronizar.');
    return;
  }

  const rawRows = sheet
    .getRange(PLANNER_CONFIG.headerRow + 1, 1, lastRow - PLANNER_CONFIG.headerRow, lastColumn)
    .getValues();

  const report = { createdOrUpdated: 0, assets: 0, previews: 0, skipped: 0, errors: [] };

  rawRows.forEach((row, offset) => {
    const rowNumber = PLANNER_CONFIG.headerRow + 1 + offset;
    const piece = value_(row, headerIndex, 'Pieza');
    const title = value_(row, headerIndex, 'Tema');
    if (!piece || !title) {
      report.skipped += 1;
      return;
    }

    try {
      const sourceKey = `${spreadsheet.getId()}:${sheet.getSheetId()}:${rowNumber}`;
      const item = upsertContentItem_(supabaseUrl, serviceRoleKey, sourceKey, row, headerIndex, rowNumber);
      const finalAssetSource = value_(row, headerIndex, 'Assets finales (Drive)');
      const assets = listDriveAssets_(finalAssetSource);
      const previewSource = value_(row, headerIndex, 'Preview / cover');

      const preview = listDriveAssets_(previewSource)[0];
      replaceAssets_(supabaseUrl, serviceRoleKey, item.id, assets);
      replacePreview_(supabaseUrl, serviceRoleKey, item.id, preview);
      report.createdOrUpdated += 1;
      report.assets += assets.length;
      report.previews += preview ? 1 : 0;
    } catch (error) {
      report.errors.push(`Fila ${rowNumber}: ${error.message}`);
    }
  });

  const message = [
    `Piezas sincronizadas: ${report.createdOrUpdated}`,
    `Assets encontrados: ${report.assets}`,
    `Covers sincronizados: ${report.previews}`,
    `Filas sin pieza o tema: ${report.skipped}`,
  ];
  if (report.errors.length) {
    message.push('', `Errores (${report.errors.length}):`, report.errors.slice(0, 8).join('\n'));
  }
  SpreadsheetApp.getUi().alert('Planificador DOOH', message.join('\n'), SpreadsheetApp.getUi().ButtonSet.OK);
}

function upsertContentItem_(supabaseUrl, serviceRoleKey, sourceKey, row, headerIndex, rowNumber) {
  const title = value_(row, headerIndex, 'Tema');
  const finalAssetSource = value_(row, headerIndex, 'Assets finales (Drive)');
  const payload = {
    source_key: sourceKey,
    project: projectFromTitle_(title),
    title: title,
    channel: normalizeChannel_(value_(row, headerIndex, 'Canal')),
    format: value_(row, headerIndex, 'Formato'),
    objective: value_(row, headerIndex, 'Objetivo'),
    caption_es: value_(row, headerIndex, 'Copy ES'),
    caption_en: value_(row, headerIndex, 'Copy EN'),
    creative_direction: value_(row, headerIndex, 'Dirección visual'),
    canva_url: null,
    asset_url: finalAssetSource || null,
    scheduled_at: dateValue_(row, headerIndex, 'Fecha/hora salida'),
    status: normalizeStatus_(value_(row, headerIndex, 'Estado')),
    publish_requested: yes_(value_(row, headerIndex, 'Programar publicación')),
    published_url: value_(row, headerIndex, 'URL publicada') || null,
    sort_order: 100000 - rowNumber,
  };

  const response = supabaseRequest_(
    supabaseUrl,
    serviceRoleKey,
    'post',
    `${PLANNER_CONFIG.supabaseTable}?on_conflict=source_key`,
    payload,
    { Prefer: 'resolution=merge-duplicates,return=representation' }
  );
  if (!response.length || !response[0].id) {
    throw new Error('Supabase no devolvió el identificador de la pieza.');
  }
  return response[0];
}

function replaceAssets_(supabaseUrl, serviceRoleKey, contentItemId, assets) {
  const prepared = assets.map((asset, index) => {
    const storagePath = `sheet-sync/${contentItemId}/${String(index + 1).padStart(2, '0')}-${asset.id}-${safeFileName_(asset.name)}`;
    uploadDriveAsset_(supabaseUrl, serviceRoleKey, storagePath, asset);
    return Object.assign({}, asset, { storagePath: storagePath });
  });

  supabaseRequest_(
    supabaseUrl,
    serviceRoleKey,
    'delete',
    `${PLANNER_CONFIG.assetsTable}?content_item_id=eq.${encodeURIComponent(contentItemId)}`
  );

  if (!prepared.length) return;

  const payload = prepared.map((asset, index) => ({
    content_item_id: contentItemId,
    placement: 'post',
    asset_type: asset.assetType,
    storage_path: asset.storagePath,
    drive_file_id: asset.id,
    source_url: asset.url,
    alt_text: asset.name,
    sort_order: index + 1,
  }));
  supabaseRequest_(supabaseUrl, serviceRoleKey, 'post', PLANNER_CONFIG.assetsTable, payload);
}

function replacePreview_(supabaseUrl, serviceRoleKey, contentItemId, preview) {
  let previewPath = null;
  if (preview) {
    previewPath = `sheet-sync/${contentItemId}/preview-${preview.id}-${safeFileName_(preview.name)}`;
    uploadDriveAsset_(supabaseUrl, serviceRoleKey, previewPath, preview);
  }
  supabaseRequest_(
    supabaseUrl,
    serviceRoleKey,
    'patch',
    `${PLANNER_CONFIG.supabaseTable}?id=eq.${encodeURIComponent(contentItemId)}`,
    { preview_path: previewPath }
  );
}

function uploadDriveAsset_(supabaseUrl, serviceRoleKey, storagePath, asset) {
  const response = UrlFetchApp.fetch(
    `${supabaseUrl}/storage/v1/object/planner-assets/${encodeURIComponent(storagePath).replace(/%2F/g, '/')}`,
    {
      method: 'post',
      contentType: asset.mimeType,
      payload: asset.blob,
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'x-upsert': 'true',
      },
      muteHttpExceptions: true,
    }
  );
  const status = response.getResponseCode();
  if (status < 200 || status >= 300) {
    throw new Error(`No se pudo copiar ${asset.name} a Storage (${status}): ${response.getContentText().slice(0, 200)}`);
  }
}

function listDriveAssets_(source) {
  const id = driveIdFromUrl_(source);
  if (!id) return [];

  // Los assets finales pueden ser carpetas; Preview / cover siempre es un archivo.
  // No se intenta abrir un JPG como carpeta: DriveApp puede devolver resultados
  // inconsistentes para ese caso y dejar el cover fuera de la sincronización.
  if (String(source).indexOf('/folders/') !== -1) {
    const folder = DriveApp.getFolderById(id);
    const iterator = folder.getFiles();
    const files = [];
    while (iterator.hasNext()) {
      const file = iterator.next();
      const mimeType = file.getMimeType();
      if (mimeType.indexOf('image/') === 0 || mimeType.indexOf('video/') === 0) {
        files.push(driveAsset_(file));
      }
    }
    return files.sort(naturalFileOrder_);
  }

  const file = DriveApp.getFileById(id);
  const mimeType = file.getMimeType();
  if (mimeType.indexOf('image/') !== 0 && mimeType.indexOf('video/') !== 0) return [];
  return [driveAsset_(file)];
}

function driveAsset_(file) {
  const mimeType = file.getMimeType();
  return {
    id: file.getId(),
    name: file.getName(),
    mimeType: mimeType,
    blob: file.getBlob(),
    assetType: mimeType.indexOf('video/') === 0 ? 'video' : 'image',
    url: `https://drive.google.com/uc?export=view&id=${file.getId()}`,
  };
}

function supabaseRequest_(supabaseUrl, serviceRoleKey, method, path, payload, extraHeaders) {
  const response = UrlFetchApp.fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method: method,
    contentType: 'application/json',
    payload: payload === undefined ? undefined : JSON.stringify(payload),
    headers: Object.assign({
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    }, extraHeaders || {}),
    muteHttpExceptions: true,
  });
  const status = response.getResponseCode();
  const body = response.getContentText();
  if (status < 200 || status >= 300) {
    throw new Error(`Supabase respondió ${status}: ${body.slice(0, 300)}`);
  }
  return body ? JSON.parse(body) : null;
}

function indexHeaders_(headers) {
  return headers.reduce((result, header, index) => {
    const clean = String(header).trim();
    if (clean) result[clean] = index;
    return result;
  }, {});
}

function value_(row, headerIndex, name) {
  const index = headerIndex[name];
  if (index === undefined || row[index] === null || row[index] === undefined) return '';
  if (row[index] instanceof Date) return row[index];
  return String(row[index]).trim();
}

function dateValue_(row, headerIndex, name) {
  const value = value_(row, headerIndex, name);
  if (!value) return null;
  if (value instanceof Date && !isNaN(value.getTime())) return value.toISOString();
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function projectFromTitle_(title) {
  return title.split('—')[0].trim() || 'DOOH';
}

function normalizeChannel_(channel) {
  const normalized = String(channel).toLowerCase();
  if (normalized.indexOf('ambos') !== -1 || (normalized.indexOf('instagram') !== -1 && normalized.indexOf('linkedin') !== -1)) return 'both';
  if (normalized.indexOf('linkedin') !== -1 || normalized === 'li') return 'linkedin';
  return 'instagram';
}

function normalizeStatus_(status) {
  const normalized = String(status).toLowerCase().trim();
  if (normalized === 'aprobado' || normalized === 'approved') return 'approved';
  if (normalized === 'en revisión' || normalized === 'en revision' || normalized === 'review') return 'review';
  if (normalized === 'rechazado' || normalized === 'rejected') return 'rejected';
  if (normalized === 'programado' || normalized === 'scheduled') return 'scheduled';
  if (normalized === 'publicado' || normalized === 'published') return 'published';
  return 'draft';
}

function yes_(value) {
  return ['si', 'sí', 'yes', 'true', '1'].indexOf(String(value).toLowerCase().trim()) !== -1;
}

function driveIdFromUrl_(value) {
  if (!value) return null;
  const stringValue = String(value);
  const folderMatch = stringValue.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) return folderMatch[1];
  const fileMatch = stringValue.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]+)/);
  return fileMatch ? fileMatch[1] : null;
}

function naturalFileOrder_(a, b) {
  return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
}

function removeTrailingSlash_(value) {
  return String(value || '').replace(/\/$/, '');
}

function safeFileName_(value) {
  return String(value || 'asset').replace(/[^a-zA-Z0-9._-]/g, '-');
}
