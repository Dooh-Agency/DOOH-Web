-- Ejecutar después de 20260825090000_social_planner.sql.
-- Assets privados y orden manual del feed.

alter table public.content_items
  add column if not exists sort_order integer not null default 0,
  add column if not exists asset_path text,
  add column if not exists story_asset_path text;

create index if not exists content_items_sort_order_idx
  on public.content_items (sort_order desc, scheduled_at desc);

insert into storage.buckets (id, name, public)
values ('planner-assets', 'planner-assets', false)
on conflict (id) do nothing;

drop policy if exists "DOOH members can read planner assets" on storage.objects;
create policy "DOOH members can read planner assets"
on storage.objects for select to authenticated
using (bucket_id = 'planner-assets' and public.is_dooh_team_member());

drop policy if exists "DOOH members can upload planner assets" on storage.objects;
create policy "DOOH members can upload planner assets"
on storage.objects for insert to authenticated
with check (bucket_id = 'planner-assets' and public.is_dooh_team_member());

drop policy if exists "DOOH members can update planner assets" on storage.objects;
create policy "DOOH members can update planner assets"
on storage.objects for update to authenticated
using (bucket_id = 'planner-assets' and public.is_dooh_team_member())
with check (bucket_id = 'planner-assets' and public.is_dooh_team_member());
