-- ForeverCuba: base de datos del panel (se ejecuta una sola vez en Supabase > SQL Editor)

-- Equipo: correos que pueden entrar al panel
create table if not exists public.equipo (email text primary key);
insert into public.equipo (email) values ('180dayan@gmail.com') on conflict do nothing;

create or replace function public.es_equipo() returns boolean
language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.equipo where lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
grant execute on function public.es_equipo() to anon, authenticated;

alter table public.equipo enable row level security;
drop policy if exists "equipo ve equipo" on public.equipo;
drop policy if exists "equipo agrega equipo" on public.equipo;
drop policy if exists "equipo quita equipo" on public.equipo;
create policy "equipo ve equipo" on public.equipo for select to authenticated using (public.es_equipo());
create policy "equipo agrega equipo" on public.equipo for insert to authenticated with check (public.es_equipo());
create policy "equipo quita equipo" on public.equipo for delete to authenticated using (public.es_equipo());

-- Propiedades
create table if not exists public.propiedades (
  id uuid primary key default gen_random_uuid(),
  creado timestamptz not null default now(),
  publicado boolean not null default true,
  orden int not null default 0,
  tipo text not null default 'Casa' check (tipo in ('Casa', 'Apartamento')),
  ciudad text not null,
  titulo_es text not null, titulo_en text, titulo_fr text,
  desc_es text, desc_en text, desc_fr text,
  habitaciones int not null default 1,
  banos int not null default 1,
  personas int not null default 2,
  precio int not null default 0,
  comodidades text[] not null default '{}',
  fotos text[] not null default '{}'
);
alter table public.propiedades enable row level security;
drop policy if exists "todos ven publicadas" on public.propiedades;
drop policy if exists "equipo agrega" on public.propiedades;
drop policy if exists "equipo edita" on public.propiedades;
drop policy if exists "equipo borra" on public.propiedades;
create policy "todos ven publicadas" on public.propiedades for select using (publicado or public.es_equipo());
create policy "equipo agrega" on public.propiedades for insert to authenticated with check (public.es_equipo());
create policy "equipo edita" on public.propiedades for update to authenticated using (public.es_equipo()) with check (public.es_equipo());
create policy "equipo borra" on public.propiedades for delete to authenticated using (public.es_equipo());
grant select on public.propiedades to anon, authenticated;
grant insert, update, delete on public.propiedades to authenticated;
grant select, insert, delete on public.equipo to authenticated;

-- Fotos (carpeta pública)
insert into storage.buckets (id, name, public) values ('fotos', 'fotos', true) on conflict (id) do nothing;
drop policy if exists "fotos publicas" on storage.objects;
drop policy if exists "equipo sube fotos" on storage.objects;
drop policy if exists "equipo borra fotos" on storage.objects;
create policy "fotos publicas" on storage.objects for select using (bucket_id = 'fotos');
create policy "equipo sube fotos" on storage.objects for insert to authenticated with check (bucket_id = 'fotos' and public.es_equipo());
create policy "equipo borra fotos" on storage.objects for delete to authenticated using (bucket_id = 'fotos' and public.es_equipo());
