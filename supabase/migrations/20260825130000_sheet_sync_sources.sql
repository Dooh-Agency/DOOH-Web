-- Ejecutar después de 20260825120000_content_item_assets.sql.
-- Referencias estables para sincronizar la grilla de Google Sheets sin duplicar piezas.

alter table public.content_items
  add column if not exists source_key text;

create unique index if not exists content_items_source_key_unique_idx
  on public.content_items (source_key)
  where source_key is not null;

alter table public.content_item_assets
  add column if not exists drive_file_id text,
  add column if not exists source_url text;

create index if not exists content_item_assets_drive_file_id_idx
  on public.content_item_assets (drive_file_id)
  where drive_file_id is not null;
