import { Module } from '@nestjs/common';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { ClaseMemoriaRepository } from './infra/clase-memoria.repository';
import { CLASE_REPOSITORY } from './clases.tokens';

@Module({
  controllers: [ClasesController],
  providers: [
    ClasesService,
    {
      provide: CLASE_REPOSITORY,
      useClass: ClaseMemoriaRepository,
      //         ^^^^^^^^^^^^^^^^^^^^^^
      // Practica 8 (Prisma): esta linea pasa a ClasePrismaRepository.
      // Ni el Service ni el Controller se enteran.
    },
  ],
})
export class ClasesModule {}
