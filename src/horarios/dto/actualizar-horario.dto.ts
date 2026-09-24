// Todo opcional: un PATCH manda solo lo que cambia.
export interface ActualizarHorarioDto {
  claseId?: number;
  dia?: string;
  horaInicio?: string;
  cupoMaximo?: number;
  entrenador?: string;
}
