import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SmartCodeDbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Empleado, Proveedor} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {ProveedorRepository} from './proveedor.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.Id,
  EmpresaRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empresa.prototype.Id>;

  public readonly proveedors: HasManyRepositoryFactory<Proveedor, typeof Empresa.prototype.Id>;

  constructor(
    @inject('datasources.smartCodeDB') dataSource: SmartCodeDbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Empresa, dataSource);
    this.proveedors = this.createHasManyRepositoryFactoryFor('proveedors', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedors', this.proveedors.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
