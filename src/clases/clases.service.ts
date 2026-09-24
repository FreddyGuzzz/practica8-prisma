import { Inject, Injectable } from '@nestjs/common';
import { Clase } from './dominio/entidades';
import type { ClaseRepository } from './dominio/clase.repository';
import { CrearClaseDto } from './dto/crear-clase.dto';
import { ActualizarClaseDto } from './dto/actualizar-clase.dto';
import { CLASE_REPOSITORY } from './clases.tokens';

@Injectable()
export class ClasesService {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly repo: ClaseRepository,
  ) {}

  listar(): Promise<Clase[]> {
    return this.repo.listar();
  }

  buscar(id: number): Promise<Clase | null> {
    return this.repo.buscarPorId(id);
  }

  crear(dto: CrearClaseDto): Promise<Clase> {
    return this.repo.crear(dto);
  }

  actualizar(id: number, dto: ActualizarClaseDto): Promise<Clase | null> {
    return this.repo.actualizar(id, dto);
  }

  eliminar(id: number): Promise<Clase | null> {
    return this.repo.eliminar(id);
  }
}
