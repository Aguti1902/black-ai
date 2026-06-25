-- Run in Supabase SQL Editor (safe to re-run)

create table if not exists team_members (
  id text primary key,
  name text not null,
  email text,
  role_en text,
  role_es text,
  bio_en text,
  bio_es text,
  image_url text,
  section text not null default 'team',
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table team_members enable row level security;

drop policy if exists "Public read team_members" on team_members;
create policy "Public read team_members"
  on team_members for select using (true);

drop policy if exists "Auth write team_members" on team_members;
create policy "Auth write team_members"
  on team_members for all using (auth.role() = 'authenticated');
