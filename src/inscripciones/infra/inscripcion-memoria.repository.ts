import { Injectable } from '@nestjs/common';
import { HORARIOS, MIEMBROS } from '../../datos/gimnasio.seed';
import { Inscripcion, NuevaInscripcion } from '../dominio/entidades';
import { InscripcionRepository } from '../dominio/inscripcion.repository';

// En la Practica 8, InscripcionPrismaRepository implementa la misma
// interfaz contra MySQL.
@Injectable()
export class InscripcionMemoriaRepository implements InscripcionRepository {
  private inscripciones: Inscripcion[] = [];
  private siguienteId = 1;

  async listar(): Promise<Inscripcion[]> {
    return this.inscripciones;
  }

  async buscarPorId(id: number): Promise<Inscripcion | null> {
    return this.inscripciones.find((i) => i.id === id) ?? null;
  }

  async buscarPorHorario(horarioId: number): Promise<Inscripcion[]> {
    return this.inscripciones.filter((i) => i.horarioId === horarioId);
  }

  async buscarHorario(horarioId: number) {
    return HORARIOS.find((h) => h.id === horarioId) ?? null;
  }

  async buscarMiembro(miembroId: number) {
    return MIEMBROS.find((m) => m.id === miembroId) ?? null;
  }

  async guardar(datos: NuevaInscripcion): Promise<Inscripcion> {
    const nueva: Inscripcion = {
      id: this.siguienteId++,
      horarioId: datos.horarioId,
      miembroId: datos.miembroId,
      estado: 'confirmada',
      creadaEn: new Date(),
    };
    this.inscripciones.push(nueva);
    return nueva;
  }

  async cancelar(id: number): Promise<Inscripcion | null> {
    const inscripcion = this.inscripciones.find((i) => i.id === id);
    if (!inscripcion) return null;
    inscripcion.estado = 'cancelada';
    return inscripcion;
  }
}
