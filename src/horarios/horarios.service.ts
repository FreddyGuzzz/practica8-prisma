import { Inject, Injectable } from '@nestjs/common';
import { Horario } from './dominio/entidades';
import type { HorarioRepository } from './dominio/horario.repository';
import { CrearHorarioDto } from './dto/crear-horario.dto';
import { ActualizarHorarioDto } from './dto/actualizar-horario.dto';
import { HORARIO_REPOSITORY } from './horarios.tokens';

@Injectable()
export class HorariosService {
  constructor(
    @Inject(HORARIO_REPOSITORY)
    private readonly repo: HorarioRepository,
  ) {}

  listar(): Promise<Horario[]> {
    return this.repo.listar();
  }

  buscar(id: number): Promise<Horario | null> {
    return this.repo.buscarPorId(id);
  }

  crear(dto: CrearHorarioDto): Promise<Horario> {
    return this.repo.crear(dto);
  }

  actualizar(id: number, dto: ActualizarHorarioDto): Promise<Horario | null> {
    return this.repo.actualizar(id, dto);
  }

  eliminar(id: number): Promise<Horario | null> {
    return this.repo.eliminar(id);
  }
}
