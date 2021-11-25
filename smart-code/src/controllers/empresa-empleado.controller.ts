import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empresa,
  Empleado,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaEmpleadoController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Empresa has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.empresaRepository.empleados(id).find(filter);
  }

  @post('/empresas/{id}/empleados', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInEmpresa',
            exclude: ['Id'],
            optional: ['empresaId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'Id'>,
  ): Promise<Empleado> {
    return this.empresaRepository.empleados(id).create(empleado);
  }

  @patch('/empresas/{id}/empleados', {
    responses: {
      '200': {
        description: 'Empresa.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empresaRepository.empleados(id).patch(empleado, where);
  }

  @del('/empresas/{id}/empleados', {
    responses: {
      '200': {
        description: 'Empresa.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empresaRepository.empleados(id).delete(where);
  }
}
