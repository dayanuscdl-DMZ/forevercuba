-- ForeverCuba: Nuestros lugares Forever (restaurantes, bares, etc.)
create table if not exists public.lugares (
  id uuid primary key default gen_random_uuid(),
  creado timestamptz not null default now(),
  publicado boolean not null default true,
  orden int not null default 0,
  nombre text not null,
  categoria text not null default 'restaurante' check (categoria in ('restaurante', 'bar', 'cafe', 'musica', 'experiencia')),
  ciudad text not null,
  direccion text,
  desc_es text, desc_en text, desc_fr text,
  tip_es text, tip_en text, tip_fr text,
  foto text
);
alter table public.lugares enable row level security;
drop policy if exists "todos ven lugares publicados" on public.lugares;
drop policy if exists "equipo agrega lugares" on public.lugares;
drop policy if exists "equipo edita lugares" on public.lugares;
drop policy if exists "equipo borra lugares" on public.lugares;
create policy "todos ven lugares publicados" on public.lugares for select using (publicado or public.es_equipo());
create policy "equipo agrega lugares" on public.lugares for insert to authenticated with check (public.es_equipo());
create policy "equipo edita lugares" on public.lugares for update to authenticated using (public.es_equipo()) with check (public.es_equipo());
create policy "equipo borra lugares" on public.lugares for delete to authenticated using (public.es_equipo());
grant select on public.lugares to anon, authenticated;
grant insert, update, delete on public.lugares to authenticated;
