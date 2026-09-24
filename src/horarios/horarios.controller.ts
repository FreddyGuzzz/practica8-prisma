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
import { HorariosService } from './horarios.service';
import type { CrearHorarioDto } from './dto/crear-horario.dto';
import type { ActualizarHorarioDto } from './dto/actualizar-horario.dto';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  /** GET /horarios */
  @Get()
  listar() {
    return this.horariosService.listar();
  }

  /** GET /horarios/2 */
  @Get(':id')
  async buscar(@Param('id') id: string) {
    const horario = await this.horariosService.buscar(Number(id));
    if (!horario) {
      throw new NotFoundException(`No existe el horario ${id}`);
    }
    return horario;
  }

  /** POST /horarios */
  @Post()
  @HttpCode(201)
  crear(@Body() dto: CrearHorarioDto) {
    return this.horariosService.crear(dto);
  }

  /** PATCH /horarios/2 */
  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarHorarioDto) {
    const horario = await this.horariosService.actualizar(Number(id), dto);
    if (!horario) {
      throw new NotFoundException(`No existe el horario ${id}`);
    }
    return horario;
  }

  /** DELETE /horarios/2 */
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const horario = await this.horariosService.eliminar(Number(id));
    if (!horario) {
      throw new NotFoundException(`No existe el horario ${id}`);
    }
    return horario;
  }
}
