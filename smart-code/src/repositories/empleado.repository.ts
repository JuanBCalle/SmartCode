import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {SmartCodeDbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Empresa, Mensaje} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {MensajeRepository} from './mensaje.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.Id,
  EmpleadoRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Empleado.prototype.Id>;

  public readonly mensajes: HasManyRepositoryFactory<Mensaje, typeof Empleado.prototype.Id>;

  constructor(
    @inject('datasources.smartCodeDB') dataSource: SmartCodeDbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('MensajeRepository') protected mensajeRepositoryGetter: Getter<MensajeRepository>,
  ) {
    super(Empleado, dataSource);
    this.mensajes = this.createHasManyRepositoryFactoryFor('mensajes', mensajeRepositoryGetter,);
    this.registerInclusionResolver('mensajes', this.mensajes.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
