import { Clase } from './entidades';
import { CrearClaseDto } from '../dto/crear-clase.dto';
import { ActualizarClaseDto } from '../dto/actualizar-clase.dto';

// La interfaz que el Service conoce. No sabe si detras hay un arreglo
// en memoria o MySQL: ese es el punto de la Practica 8 (Prisma).
export interface ClaseRepository {
  listar(): Promise<Clase[]>;
  buscarPorId(id: number): Promise<Clase | null>;
  crear(datos: CrearClaseDto): Promise<Clase>;
  actualizar(id: number, datos: ActualizarClaseDto): Promise<Clase | null>;
  eliminar(id: number): Promise<Clase | null>;
}
