import { Injectable } from '@nestjs/common';
import { Miembro } from '../dominio/entidades';
import { MiembroRepository } from '../dominio/miembro.repository';
import { CrearMiembroDto } from '../dto/crear-miembro.dto';
import { ActualizarMiembroDto } from '../dto/actualizar-miembro.dto';

// En la Practica 8, MiembroPrismaRepository implementa la misma
// interfaz contra MySQL.
@Injectable()
export class MiembroMemoriaRepository implements MiembroRepository {
  private miembros: Miembro[] = [
    { id: 1, nombre: 'Karla Duarte', correo: 'karla@itson.mx', membresia: 'premium', activo: true },
    { id: 2, nombre: 'Omar Valdez', correo: 'omar@itson.mx', membresia: 'plus', activo: true },
    { id: 3, nombre: 'Sofia Ibarra', correo: 'sofia@itson.mx', membresia: 'basica', activo: true },
  ];
  private siguienteId = 4;

  async listar(): Promise<Miembro[]> {
    return this.miembros;
  }

  async buscarPorId(id: number): Promise<Miembro | null> {
    return this.miembros.find((m) => m.id === id) ?? null;
  }

  async crear(datos: CrearMiembroDto): Promise<Miembro> {
    const nuevo: Miembro = {
      id: this.siguienteId++,
      nombre: datos.nombre,
      correo: datos.correo,
      membresia: datos.membresia,
      activo: true,
    };
    this.miembros.push(nuevo);
    return nuevo;
  }

  async actualizar(id: number, datos: ActualizarMiembroDto): Promise<Miembro | null> {
    const miembro = this.miembros.find((m) => m.id === id);
    if (!miembro) return null;
    if (datos.nombre !== undefined) miembro.nombre = datos.nombre;
    if (datos.correo !== undefined) miembro.correo = datos.correo;
    if (datos.membresia !== undefined) miembro.membresia = datos.membresia;
    if (datos.activo !== undefined) miembro.activo = datos.activo;
    return miembro;
  }

  async eliminar(id: number): Promise<Miembro | null> {
    const indice = this.miembros.findIndex((m) => m.id === id);
    if (indice === -1) return null;
    const [eliminado] = this.miembros.splice(indice, 1);
    return eliminado;
  }
}
