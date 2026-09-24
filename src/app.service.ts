import { Injectable } from '@nestjs/common';

@Injectable()               // marca la clase como "inyectable": Nest puede crearla y entregársela a quien la pida
export class AppService {   // el Service: aquí vive la lógica, separada de las rutas del Controller
  getHello(): string {
    return 'Hello World!';
  }
}
