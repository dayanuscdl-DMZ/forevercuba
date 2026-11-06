-- ForeverCuba: casilla VIP y autos en el panel
alter table public.propiedades add column if not exists vip boolean not null default false;
alter table public.lugares add column if not exists vip boolean not null default false;

create table if not exists public.autos (
  id uuid primary key default gen_random_uuid(),
  creado timestamptz not null default now(),
  publicado boolean not null default true,
  vip boolean not null default false,
  orden int not null default 0,
  nombre_es text not null,
  nombre_en text,
  nombre_fr text,
  modelo text,
  personas int not null default 4,
  puertas int not null default 4,
  maletas int not null default 2,
  transmision text not null default 'auto' check (transmision in ('manual', 'auto', 'driver')),
  precio numeric not null default 0,
  foto text
);
alter table public.autos enable row level security;
drop policy if exists "todos ven autos publicados" on public.autos;
drop policy if exists "equipo agrega autos" on public.autos;
drop policy if exists "equipo edita autos" on public.autos;
drop policy if exists "equipo borra autos" on public.autos;
create policy "todos ven autos publicados" on public.autos for select using (publicado or public.es_equipo());
create policy "equipo agrega autos" on public.autos for insert to authenticated with check (public.es_equipo());
create policy "equipo edita autos" on public.autos for update to authenticated using (public.es_equipo()) with check (public.es_equipo());
create policy "equipo borra autos" on public.autos for delete to authenticated using (public.es_equipo());
grant select on public.autos to anon, authenticated;
grant insert, update, delete on public.autos to authenticated;
