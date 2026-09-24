// El cupo (cupoMaximo) vive aqui como dato, pero la REGLA de "no
// pasarse del cupo" (CupoLlenoError) sigue viviendo solo en
// Inscripciones. Este modulo no la valida -- es puro CRUD.
export interface Horario {
  id: number;
  claseId: number;
  dia: string;
  horaInicio: string;
  cupoMaximo: number;
  entrenador: string;
}
