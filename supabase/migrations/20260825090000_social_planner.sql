-- DOOH Social Planner — esquema inicial
-- Ejecutar una vez desde Supabase SQL Editor.
-- Las políticas RLS son obligatorias: la clave publishable se usa desde el navegador.

create extension if not exists pgcrypto;

create table if not exists public.team_members (
  email text primary key check (email = lower(email)),
  role text not null default 'editor' check (role in ('admin', 'editor', 'reviewer')),
  created_at timestamptz not null default now()
);

-- Equipo de aprobación definido para DOOH. Agregar o remover accesos desde el SQL Editor.
insert into public.team_members (email, role)
values
  ('florencia@dooh.com.ar', 'admin'),
  ('fernanda@dooh.com.ar', 'admin'),
  ('hello@dooh.com.ar', 'reviewer')
on conflict (email) do update set role = excluded.role;

create or replace function public.is_dooh_team_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.team_members
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  project text not null,
  title text not null,
  channel text not null check (channel in ('instagram', 'linkedin', 'both')),
  format text not null,
  objective text not null default '',
  caption_es text not null default '',
  caption_en text not null default '',
  call_to_action text not null default '',
  creative_direction text not null default '',
  canva_url text,
  asset_url text,
  story_asset_url text,
  scheduled_at timestamptz,
  story_scheduled_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'rejected', 'scheduled', 'published')),
  publish_requested boolean not null default false,
  published_url text,
  approved_at timestamptz,
  approved_by uuid references auth.users(id),
  created_by uuid references auth.users(id),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint story_is_later_than_primary check (
    story_scheduled_at is null
    or scheduled_at is null
    or story_scheduled_at >= scheduled_at + interval '20 hours'
  )
);

create index if not exists content_items_scheduled_at_idx on public.content_items (scheduled_at);
create index if not exists content_items_status_idx on public.content_items (status);

create table if not exists public.content_item_events (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  event_type text not null,
  details jsonb not null default '{}'::jsonb,
  actor_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists content_item_events_item_idx on public.content_item_events (content_item_id, created_at desc);

create or replace function public.set_content_item_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_items_set_updated_at on public.content_items;
create trigger content_items_set_updated_at
before update on public.content_items
for each row execute function public.set_content_item_updated_at();

alter table public.team_members enable row level security;
alter table public.content_items enable row level security;
alter table public.content_item_events enable row level security;

revoke all on public.team_members from anon, authenticated;

drop policy if exists "DOOH members can read content" on public.content_items;
create policy "DOOH members can read content"
on public.content_items for select to authenticated
using (public.is_dooh_team_member());

drop policy if exists "DOOH members can create content" on public.content_items;
create policy "DOOH members can create content"
on public.content_items for insert to authenticated
with check (public.is_dooh_team_member() and created_by = auth.uid());

drop policy if exists "DOOH members can update content" on public.content_items;
create policy "DOOH members can update content"
on public.content_items for update to authenticated
using (public.is_dooh_team_member())
with check (public.is_dooh_team_member());

drop policy if exists "DOOH members can read content events" on public.content_item_events;
create policy "DOOH members can read content events"
on public.content_item_events for select to authenticated
using (public.is_dooh_team_member());

drop policy if exists "DOOH members can add content events" on public.content_item_events;
create policy "DOOH members can add content events"
on public.content_item_events for insert to authenticated
with check (public.is_dooh_team_member() and actor_id = auth.uid());

grant usage on schema public to authenticated;
grant select, insert, update on public.content_items to authenticated;
grant select, insert on public.content_item_events to authenticated;
grant execute on function public.is_dooh_team_member() to authenticated;
