-- Corrige el destino de ON CONFLICT usado por automation/google-sheet-sync/Code.gs.
-- PostgreSQL no puede inferir un índice único parcial desde ON CONFLICT (source_key).
-- Una restricción UNIQUE permite valores NULL repetidos y conserva las piezas
-- creadas fuera del Sheet, pero identifica unívocamente las sincronizadas.

drop index if exists public.content_items_source_key_unique_idx;

alter table public.content_items
  drop constraint if exists content_items_source_key_key;

alter table public.content_items
  add constraint content_items_source_key_key unique (source_key);
