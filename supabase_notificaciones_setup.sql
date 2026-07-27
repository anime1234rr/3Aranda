-- Políticas RLS para public.notificaciones.
-- Cada usuario solo puede ver y actualizar (marcar como leídas) sus propias notificaciones.

alter table public.notificaciones enable row level security;

create policy "notificaciones_select_propias"
  on public.notificaciones for select
  using (auth.uid() = usuario_id);

create policy "notificaciones_update_propias"
  on public.notificaciones for update
  using (auth.uid() = usuario_id)
  with check (auth.uid() = usuario_id);
