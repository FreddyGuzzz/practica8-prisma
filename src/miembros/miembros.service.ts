import { Inject, Injectable } from '@nestjs/common';
import { Miembro } from './dominio/entidades';
import type { MiembroRepository } from './dominio/miembro.repository';
import { CrearMiembroDto } from './dto/crear-miembro.dto';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import { MIEMBRO_REPOSITORY } from './miembros.tokens';

@Injectable()
export class MiembrosService {
  constructor(
    @Inject(MIEMBRO_REPOSITORY)
    private readonly repo: MiembroRepository,
  ) {}

  listar(): Promise<Miembro[]> {
    return this.repo.listar();
  }

  buscar(id: number): Promise<Miembro | null> {
    return this.repo.buscarPorId(id);
  }

  crear(dto: CrearMiembroDto): Promise<Miembro> {
    return this.repo.crear(dto);
  }

  actualizar(id: number, dto: ActualizarMiembroDto): Promise<Miembro | null> {
    return this.repo.actualizar(id, dto);
  }

  eliminar(id: number): Promise<Miembro | null> {
    return this.repo.eliminar(id);
  }
}
