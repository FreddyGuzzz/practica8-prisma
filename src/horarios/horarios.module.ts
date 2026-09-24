import { Module } from '@nestjs/common';
import { HorariosController } from './horarios.controller';
import { HorariosService } from './horarios.service';
import { HorarioMemoriaRepository } from './infra/horario-memoria.repository';
import { HORARIO_REPOSITORY } from './horarios.tokens';

@Module({
  controllers: [HorariosController],
  providers: [
    HorariosService,
    {
      provide: HORARIO_REPOSITORY,
      useClass: HorarioMemoriaRepository,
      //         ^^^^^^^^^^^^^^^^^^^^^^^^
      // Practica 8 (Prisma): esta linea pasa a HorarioPrismaRepository.
      // Ni el Service ni el Controller se enteran.
    },
  ],
  exports: [HorariosService],
})
export class HorariosModule {}
