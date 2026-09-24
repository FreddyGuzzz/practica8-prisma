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
import { ClasesService } from './clases.service';
import type { CrearClaseDto } from './dto/crear-clase.dto';
import type { ActualizarClaseDto } from './dto/actualizar-clase.dto';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  /** GET /clases */
  @Get()
  listar() {
    return this.clasesService.listar();
  }

  /** GET /clases/2 */
  @Get(':id')
  async buscar(@Param('id') id: string) {
    const clase = await this.clasesService.buscar(Number(id));
    if (!clase) {
      throw new NotFoundException(`No existe la clase ${id}`);
    }
    return clase;
  }

  /** POST /clases */
  @Post()
  @HttpCode(201)
  crear(@Body() dto: CrearClaseDto) {
    return this.clasesService.crear(dto);
  }

  /** PATCH /clases/2 */
  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarClaseDto) {
    const clase = await this.clasesService.actualizar(Number(id), dto);
    if (!clase) {
      throw new NotFoundException(`No existe la clase ${id}`);
    }
    return clase;
  }

  /** DELETE /clases/2 */
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const clase = await this.clasesService.eliminar(Number(id));
    if (!clase) {
      throw new NotFoundException(`No existe la clase ${id}`);
    }
    return clase;
  }
}
