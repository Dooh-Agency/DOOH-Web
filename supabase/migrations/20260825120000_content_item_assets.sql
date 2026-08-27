-- Ejecutar después de 20260825110000_planner_assets_and_order.sql.
-- Cada publicación puede incluir una o más placas, videos o assets de story.

create table if not exists public.content_item_assets (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  placement text not null default 'post' check (placement in ('post', 'story')),
  asset_type text not null check (asset_type in ('image', 'video')),
  storage_path text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists content_item_assets_item_idx
  on public.content_item_assets (content_item_id, placement, sort_order);

alter table public.content_item_assets enable row level security;

drop policy if exists "DOOH members can read content assets" on public.content_item_assets;
create policy "DOOH members can read content assets"
on public.content_item_assets for select to authenticated
using (public.is_dooh_team_member());

drop policy if exists "DOOH members can manage content assets" on public.content_item_assets;
create policy "DOOH members can manage content assets"
on public.content_item_assets for all to authenticated
using (public.is_dooh_team_member())
with check (public.is_dooh_team_member());

grant select, insert, update, delete on public.content_item_assets to authenticated;
