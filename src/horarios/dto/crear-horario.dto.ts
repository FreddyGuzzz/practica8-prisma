// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace
// ValidationPipe.
export interface CrearHorarioDto {
  claseId: number;
  dia: string;
  horaInicio: string;
  cupoMaximo: number;
  entrenador: string;
}
