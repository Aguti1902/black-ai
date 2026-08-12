-- OPTIONAL — the app now stores team profiles in site_settings
-- (keys: team_members, team_hidden_ids), same pattern as contact/metrics.
--
-- Keep this file only if you later want a dedicated relational table.
-- Safe to re-run. Project: https://supabase.com/dashboard/project/iskqcjocoremhxpaaavp

create table if not exists public.team_members (
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

alter table public.team_members enable row level security;

drop policy if exists "Public read team_members" on public.team_members;
create policy "Public read team_members"
  on public.team_members for select
  using (true);

drop policy if exists "Auth write team_members" on public.team_members;
create policy "Auth write team_members"
  on public.team_members for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select on public.team_members to anon, authenticated;
grant insert, update, delete on public.team_members to authenticated;

notify pgrst, 'reload schema';
