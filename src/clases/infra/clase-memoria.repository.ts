import { Injectable } from '@nestjs/common';
import { Clase } from '../dominio/entidades';
import { ClaseRepository } from '../dominio/clase.repository';
import { CrearClaseDto } from '../dto/crear-clase.dto';
import { ActualizarClaseDto } from '../dto/actualizar-clase.dto';

// En la Practica 8, ClasePrismaRepository implementa la misma
// interfaz contra MySQL.
@Injectable()
export class ClaseMemoriaRepository implements ClaseRepository {
  private clases: Clase[] = [
    { id: 1, nombre: 'Yoga' },
    { id: 2, nombre: 'Spinning' },
  ];
  private siguienteId = 3;

  async listar(): Promise<Clase[]> {
    return this.clases;
  }

  async buscarPorId(id: number): Promise<Clase | null> {
    return this.clases.find((c) => c.id === id) ?? null;
  }

  async crear(datos: CrearClaseDto): Promise<Clase> {
    const nueva: Clase = { id: this.siguienteId++, nombre: datos.nombre };
    this.clases.push(nueva);
    return nueva;
  }

  async actualizar(id: number, datos: ActualizarClaseDto): Promise<Clase | null> {
    const clase = this.clases.find((c) => c.id === id);
    if (!clase) return null;
    if (datos.nombre !== undefined) clase.nombre = datos.nombre;
    return clase;
  }

  async eliminar(id: number): Promise<Clase | null> {
    const indice = this.clases.findIndex((c) => c.id === id);
    if (indice === -1) return null;
    const [eliminada] = this.clases.splice(indice, 1);
    return eliminada;
  }
}
