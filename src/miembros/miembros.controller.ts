import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import type { CrearMiembroDto } from './dto/crear-miembro.dto';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {}

  /** GET /miembros */
  @Get()
  listar() {
    return this.miembrosService.listar();
  }

  /** GET /miembros/2 */
  @Get(':id')
  async buscar(@Param('id') id: string) {
    const miembro = await this.miembrosService.buscar(Number(id));
    if (!miembro) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return miembro;
  }

  /** POST /miembros */
  @Post()
  @HttpCode(201)
  crear(@Body() dto: CrearMiembroDto) {
    return this.miembrosService.crear(dto);
  }

  /** PATCH /miembros/2 */
  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarMiembroDto) {
    const miembro = await this.miembrosService.actualizar(Number(id), dto);
    if (!miembro) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return miembro;
  }

  /** DELETE /miembros/2 */
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const miembro = await this.miembrosService.eliminar(Number(id));
    if (!miembro) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return miembro;
  }
}
