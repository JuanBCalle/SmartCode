import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SmartCodeDbDataSource} from '../datasources';
import {Mensaje, MensajeRelations} from '../models';

export class MensajeRepository extends DefaultCrudRepository<
  Mensaje,
  typeof Mensaje.prototype.Id,
  MensajeRelations
> {
  constructor(
    @inject('datasources.smartCodeDB') dataSource: SmartCodeDbDataSource,
  ) {
    super(Mensaje, dataSource);
  }
}
