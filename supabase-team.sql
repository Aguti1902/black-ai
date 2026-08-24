-- Run in Supabase SQL Editor (safe to re-run)
-- Fixes Team admin: create/edit profiles on public.team_members
-- Project: https://supabase.com/dashboard/project/iskqcjocoremhxpaaavp/sql/new

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

-- Public can read
drop policy if exists "Public read team_members" on public.team_members;
create policy "Public read team_members"
  on public.team_members for select
  using (true);

-- Authenticated can insert / update / delete (split policies = more reliable than FOR ALL)
drop policy if exists "Auth write team_members" on public.team_members;
drop policy if exists "Auth insert team_members" on public.team_members;
drop policy if exists "Auth update team_members" on public.team_members;
drop policy if exists "Auth delete team_members" on public.team_members;

create policy "Auth insert team_members"
  on public.team_members for insert
  with check (auth.role() = 'authenticated');

create policy "Auth update team_members"
  on public.team_members for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Auth delete team_members"
  on public.team_members for delete
  using (auth.role() = 'authenticated');

grant select on public.team_members to anon, authenticated;
grant insert, update, delete on public.team_members to authenticated;

-- Soft-hide list must NOT hide rows that exist in team_members.
-- Keep only ids that are NOT present as real profiles (static soft-deletes).
update public.site_settings
set
  value = coalesce((
    select jsonb_agg(to_jsonb(h))
    from jsonb_array_elements_text(value) as h
    where not exists (
      select 1 from public.team_members t where t.id = h
    )
  ), '[]'::jsonb),
  updated_at = now()
where key = 'team_hidden_ids';

notify pgrst, 'reload schema';
