-- Run in Supabase SQL Editor (safe to re-run)
-- Fixes: "Could not find the table 'public.team_members' in the schema cache"
-- Project: https://supabase.com/dashboard/project/iskqcjocoremhxpaaavp
--
-- After running, PostgREST picks up the table via NOTIFY below.
-- If upserts still fail, also use: Settings → API → Reload schema

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

-- Refresh PostgREST schema cache so /rest/v1/team_members is exposed
notify pgrst, 'reload schema';
