-- Run this in Supabase SQL Editor (safe to re-run)

-- Homepage metrics storage
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

alter table site_settings enable row level security;

drop policy if exists "Public read site_settings" on site_settings;
create policy "Public read site_settings"
  on site_settings for select using (true);

drop policy if exists "Auth write site_settings" on site_settings;
create policy "Auth write site_settings"
  on site_settings for all using (auth.role() = 'authenticated');

-- Map coordinates on projects
alter table projects add column if not exists map_lng double precision;
alter table projects add column if not exists map_lat double precision;
