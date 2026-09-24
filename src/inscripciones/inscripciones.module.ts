import { Module } from '@nestjs/common';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionMemoriaRepository } from './infra/inscripcion-memoria.repository';
import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens';

@Module({
  controllers: [InscripcionesController],
  providers: [
    InscripcionesService,
    {
      provide: INSCRIPCION_REPOSITORY,
      useClass: InscripcionMemoriaRepository,
      //         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Practica 8 (Prisma): esta linea pasa a InscripcionPrismaRepository.
      // Ni el Service ni el Controller se enteran.
    },
  ],
})
export class InscripcionesModule {}
