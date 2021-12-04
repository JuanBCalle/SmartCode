import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Proveedor} from './proveedor.model';

@model()
export class Empresa extends Entity {
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
  RazonSocial: string;

  @property({
    type: 'string',
    required: true,
  })
  Nit: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Proveedor)
  proveedors: Proveedor[];

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
