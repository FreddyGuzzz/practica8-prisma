import { Horario, Miembro } from '../inscripciones/dominio/entidades';

export const HORARIOS: Horario[] = [
  { id: 1, claseId: 1, dia: 'lunes', horaInicio: '07:00', cupoMaximo: 2, entrenador: 'Ana Robles' },
  { id: 2, claseId: 1, dia: 'miercoles', horaInicio: '07:00', cupoMaximo: 3, entrenador: 'Ana Robles' },
  { id: 3, claseId: 2, dia: 'martes', horaInicio: '19:00', cupoMaximo: 4, entrenador: 'Luis Fierro' },
];

export const MIEMBROS: Miembro[] = [
  { id: 1, nombre: 'Karla Duarte', correo: 'karla@itson.mx', membresia: 'premium', activo: true },
  { id: 2, nombre: 'Omar Valdez', correo: 'omar@itson.mx', membresia: 'plus', activo: true },
  { id: 3, nombre: 'Sofia Ibarra', correo: 'sofia@itson.mx', membresia: 'basica', activo: true },
];
