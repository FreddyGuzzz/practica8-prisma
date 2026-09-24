import { Miembro } from './entidades';
import { CrearMiembroDto } from '../dto/crear-miembro.dto';
import { ActualizarMiembroDto } from '../dto/actualizar-miembro.dto';

// La interfaz que el Service conoce. No sabe si detras hay un arreglo
// en memoria o MySQL: ese es el punto de la Practica 8 (Prisma).
export interface MiembroRepository {
  listar(): Promise<Miembro[]>;
  buscarPorId(id: number): Promise<Miembro | null>;
  crear(datos: CrearMiembroDto): Promise<Miembro>;
  actualizar(id: number, datos: ActualizarMiembroDto): Promise<Miembro | null>;
  eliminar(id: number): Promise<Miembro | null>;
}
