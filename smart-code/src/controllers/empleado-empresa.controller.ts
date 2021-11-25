import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Empresa,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoEmpresaController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Empleado.prototype.Id,
  ): Promise<Empresa> {
    return this.empleadoRepository.empresa(id);
  }
}
