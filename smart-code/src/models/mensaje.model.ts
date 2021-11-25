import {Entity, model, property} from '@loopback/repository';

@model()
export class Mensaje extends Entity {
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
  Body: string;

  @property({
    type: 'string',
  })
  empleadoId?: string;

  constructor(data?: Partial<Mensaje>) {
    super(data);
  }
}

export interface MensajeRelations {
  // describe navigational properties here
}

export type MensajeWithRelations = Mensaje & MensajeRelations;
