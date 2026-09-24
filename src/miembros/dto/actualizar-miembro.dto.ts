// Todo opcional: un PATCH manda solo lo que cambia. "activo" es el
// campo pensado para dar de baja a un miembro sin borrar su historial.
export interface ActualizarMiembroDto {
  nombre?: string;
  correo?: string;
  membresia?: string;
  activo?: boolean;
}
