import { Injectable } from '@nestjs/common';
import { Horario } from '../dominio/entidades';
import { HorarioRepository } from '../dominio/horario.repository';
import { CrearHorarioDto } from '../dto/crear-horario.dto';
import { ActualizarHorarioDto } from '../dto/actualizar-horario.dto';

// En la Practica 8, HorarioPrismaRepository implementa la misma
// interfaz contra MySQL.
@Injectable()
export class HorarioMemoriaRepository implements HorarioRepository {
  private horarios: Horario[] = [
    { id: 1, claseId: 1, dia: 'lunes', horaInicio: '07:00', cupoMaximo: 2, entrenador: 'Ana Robles' },
    { id: 2, claseId: 1, dia: 'miercoles', horaInicio: '07:00', cupoMaximo: 3, entrenador: 'Ana Robles' },
    { id: 3, claseId: 2, dia: 'martes', horaInicio: '19:00', cupoMaximo: 4, entrenador: 'Luis Fierro' },
  ];
  private siguienteId = 4;

  async listar(): Promise<Horario[]> {
    return this.horarios;
  }

  async buscarPorId(id: number): Promise<Horario | null> {
    return this.horarios.find((h) => h.id === id) ?? null;
  }

  async crear(datos: CrearHorarioDto): Promise<Horario> {
    const nuevo: Horario = {
      id: this.siguienteId++,
      claseId: datos.claseId,
      dia: datos.dia,
      horaInicio: datos.horaInicio,
      cupoMaximo: datos.cupoMaximo,
      entrenador: datos.entrenador,
    };
    this.horarios.push(nuevo);
    return nuevo;
  }

  async actualizar(id: number, datos: ActualizarHorarioDto): Promise<Horario | null> {
    const horario = this.horarios.find((h) => h.id === id);
    if (!horario) return null;
    if (datos.claseId !== undefined) horario.claseId = datos.claseId;
    if (datos.dia !== undefined) horario.dia = datos.dia;
    if (datos.horaInicio !== undefined) horario.horaInicio = datos.horaInicio;
    if (datos.cupoMaximo !== undefined) horario.cupoMaximo = datos.cupoMaximo;
    if (datos.entrenador !== undefined) horario.entrenador = datos.entrenador;
    return horario;
  }

  async eliminar(id: number): Promise<Horario | null> {
    const indice = this.horarios.findIndex((h) => h.id === id);
    if (indice === -1) return null;
    const [eliminado] = this.horarios.splice(indice, 1);
    return eliminado;
  }
}
