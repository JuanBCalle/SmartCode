import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Mensaje} from './mensaje.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Edad: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaNacimiento: string;

  @property({
    type: 'number',
    required: true,
  })
  Sueldo: number;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @property({
    type: 'boolean',
    required: true,
  })
  EsDirectivo: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  EsCliente: boolean;

  @belongsTo(() => Empresa)
  empresaId: string;

  @hasMany(() => Mensaje)
  mensajes: Mensaje[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
