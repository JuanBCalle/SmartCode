import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SmartCodeDbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations} from '../models';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.Id,
  ProveedorRelations
> {
  constructor(
    @inject('datasources.smartCodeDB') dataSource: SmartCodeDbDataSource,
  ) {
    super(Proveedor, dataSource);
  }
}
