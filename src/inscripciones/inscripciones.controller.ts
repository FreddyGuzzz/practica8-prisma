import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { InscripcionesService } from './inscripciones.service';
import type { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto';
import {
  CupoLlenoError,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from './dominio/errores';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly servicio: InscripcionesService) {}

  @Get()
  async listar() {
    const lista = await this.servicio.listar();
    return lista.map(aInscripcionDto);
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const inscripcion = await this.servicio.buscar(Number(id));
    if (!inscripcion) {
      throw new NotFoundException(`No existe la inscripcion ${id}`);
    }
    return aInscripcionDto(inscripcion);
  }

  @Post()
  @HttpCode(201)
  async crear(
    @Body() dto: CrearInscripcionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 400 = no entiendo la peticion. 409 = la entiendo, pero choca
    // con el estado actual del sistema.
    if (!Number.isInteger(dto?.horarioId) || !Number.isInteger(dto?.miembroId)) {
      throw new BadRequestException(
        'horarioId y miembroId son obligatorios y deben ser numeros enteros',
      );
    }

    try {
      const inscripcion = await this.servicio.crear(dto);
      res.setHeader('Location', `/inscripciones/${inscripcion.id}`);
      return aInscripcionDto(inscripcion);
    } catch (error) {
      if (error instanceof HorarioNoEncontradoError || error instanceof MiembroNoEncontradoError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof CupoLlenoError || error instanceof InscripcionDuplicadaError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async cancelar(@Param('id') id: string) {
    const cancelada = await this.servicio.cancelar(Number(id));
    if (!cancelada) {
      throw new NotFoundException(`No existe la inscripcion ${id}`);
    }
    return aInscripcionDto(cancelada);
  }
}
