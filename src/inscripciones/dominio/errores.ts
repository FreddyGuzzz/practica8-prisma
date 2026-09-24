export class HorarioNoEncontradoError extends Error {
  constructor(horarioId: number) {
    super(`No existe el horario ${horarioId}`);
  }
}

export class MiembroNoEncontradoError extends Error {
  constructor(miembroId: number) {
    super(`No existe el miembro ${miembroId}`);
  }
}

export class CupoLlenoError extends Error {
  constructor(horarioId: number, cupoMaximo: number) {
    super(`El horario ${horarioId} ya tiene ${cupoMaximo} inscripciones confirmadas`);
  }
}

export class InscripcionDuplicadaError extends Error {
  constructor(horarioId: number, miembroId: number) {
    super(`El miembro ${miembroId} ya esta inscrito en el horario ${horarioId}`);
  }
}
