import { Horario, Inscripcion, Miembro, NuevaInscripcion } from './entidades';

// La interfaz que el Service conoce. No sabe si detras hay un arreglo
// en memoria o MySQL: ese es el punto de la Practica 8 (Prisma).
export interface InscripcionRepository {
  listar(): Promise<Inscripcion[]>;
  buscarPorId(id: number): Promise<Inscripcion | null>;
  buscarPorHorario(horarioId: number): Promise<Inscripcion[]>;
  buscarHorario(horarioId: number): Promise<Horario | null>;
  buscarMiembro(miembroId: number): Promise<Miembro | null>;
  guardar(datos: NuevaInscripcion): Promise<Inscripcion>;
  cancelar(id: number): Promise<Inscripcion | null>;
}
