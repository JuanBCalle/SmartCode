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
  Proveedor,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaProveedorController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Array of Empresa has many Proveedor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.empresaRepository.proveedors(id).find(filter);
  }

  @post('/empresas/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedorInEmpresa',
            exclude: ['Id'],
            optional: ['empresaId']
          }),
        },
      },
    }) proveedor: Omit<Proveedor, 'Id'>,
  ): Promise<Proveedor> {
    return this.empresaRepository.proveedors(id).create(proveedor);
  }

  @patch('/empresas/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Empresa.Proveedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Partial<Proveedor>,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.empresaRepository.proveedors(id).patch(proveedor, where);
  }

  @del('/empresas/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Empresa.Proveedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.empresaRepository.proveedors(id).delete(where);
  }
}
