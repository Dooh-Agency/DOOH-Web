-- El panel de previsualización solo consulta la grilla sincronizada.
-- Apps Script usa la service_role y no queda afectado por estas políticas.

drop policy if exists "DOOH members can create content" on public.content_items;
drop policy if exists "DOOH members can update content" on public.content_items;
drop policy if exists "DOOH members can add content events" on public.content_item_events;
drop policy if exists "DOOH members can manage content assets" on public.content_item_assets;

revoke insert, update, delete on public.content_items from authenticated;
revoke insert, update, delete on public.content_item_events from authenticated;
revoke insert, update, delete on public.content_item_assets from authenticated;

drop policy if exists "DOOH members can upload planner assets" on storage.objects;
drop policy if exists "DOOH members can update planner assets" on storage.objects;
