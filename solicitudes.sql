-- ForeverCuba: solicitudes de clientes (se guardan al tocar "Enviar solicitud")
create table if not exists public.solicitudes (
  id uuid primary key default gen_random_uuid(),
  creado timestamptz not null default now(),
  origen text not null default 'solicitud',
  nombre text,
  telefono text,
  email text,
  mensaje text not null,
  atendida boolean not null default false
);
alter table public.solicitudes enable row level security;
drop policy if exists "clientes envian solicitudes" on public.solicitudes;
drop policy if exists "equipo ve solicitudes" on public.solicitudes;
drop policy if exists "equipo edita solicitudes" on public.solicitudes;
drop policy if exists "equipo borra solicitudes" on public.solicitudes;
create policy "clientes envian solicitudes" on public.solicitudes for insert to anon, authenticated
  with check (atendida = false and char_length(mensaje) between 1 and 5000 and char_length(coalesce(email, '')) <= 200 and char_length(coalesce(telefono, '')) <= 60 and char_length(coalesce(nombre, '')) <= 200);
create policy "equipo ve solicitudes" on public.solicitudes for select to authenticated using (public.es_equipo());
create policy "equipo edita solicitudes" on public.solicitudes for update to authenticated using (public.es_equipo()) with check (public.es_equipo());
create policy "equipo borra solicitudes" on public.solicitudes for delete to authenticated using (public.es_equipo());
grant insert on public.solicitudes to anon, authenticated;
grant select, update, delete on public.solicitudes to authenticated;
