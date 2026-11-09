-- Run in Supabase SQL Editor (safe to re-run)
-- Adds the image gallery of each article to public.news
-- Project: https://supabase.com/dashboard/project/iskqcjocoremhxpaaavp/sql/new
--
-- OPTIONAL: the admin panel already works without this column — galleries are
-- then stored in public.site_settings under the key 'news_galleries'. Running
-- this script just moves them into a proper column on the news table.

alter table public.news
  add column if not exists gallery jsonb not null default '[]'::jsonb;

-- Move any gallery saved through the site_settings fallback into the new column
update public.news n
set gallery = coalesce(s.value -> n.id, '[]'::jsonb)
from public.site_settings s
where s.key = 'news_galleries'
  and s.value ? n.id
  and n.gallery = '[]'::jsonb;

-- Reload PostgREST schema cache so the new column is visible straight away
notify pgrst, 'reload schema';
