-- Portada opcional para la vista previa de una pieza (especialmente videos).
alter table public.content_items
  add column if not exists preview_path text;
