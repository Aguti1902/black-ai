-- Run once in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/iskqcjocoremhxpaaavp/sql/new
--
-- Fixes "I save a new team profile but it does not appear / publish".
-- Cause: live admin hides ANY id listed in site_settings.team_hidden_ids,
-- including rows that were successfully inserted into team_members
-- (e.g. carmen-mora is in the table AND in the hidden list).

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
  on public.team_members for select using (true);

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

-- 1) Immediate: un-hide every id that already exists in team_members
update public.site_settings
set
  value = coalesce((
    select jsonb_agg(to_jsonb(h))
    from jsonb_array_elements_text(coalesce(value, '[]'::jsonb)) as h
    where not exists (select 1 from public.team_members t where t.id = h)
  ), '[]'::jsonb),
  updated_at = now()
where key = 'team_hidden_ids';

-- 2) Permanent: whenever a profile is inserted/updated, remove it from hidden list
create or replace function public.team_members_unhide()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.site_settings
  set
    value = coalesce((
      select jsonb_agg(to_jsonb(h))
      from jsonb_array_elements_text(coalesce(value, '[]'::jsonb)) as h
      where h <> new.id
    ), '[]'::jsonb),
    updated_at = now()
  where key = 'team_hidden_ids';
  return new;
end;
$$;

drop trigger if exists team_members_unhide_trg on public.team_members;
create trigger team_members_unhide_trg
after insert or update of id on public.team_members
for each row execute function public.team_members_unhide();

notify pgrst, 'reload schema';

-- Sanity check (optional): should list carmen-mora and NOT include her in hidden
-- select id, name from team_members order by created_at;
-- select value from site_settings where key = 'team_hidden_ids';
