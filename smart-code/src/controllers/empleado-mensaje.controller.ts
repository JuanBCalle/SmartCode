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
  Empleado,
  Mensaje,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoMensajeController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Mensaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mensaje)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mensaje>,
  ): Promise<Mensaje[]> {
    return this.empleadoRepository.mensajes(id).find(filter);
  }

  @post('/empleados/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mensaje)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {
            title: 'NewMensajeInEmpleado',
            exclude: ['Id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) mensaje: Omit<Mensaje, 'Id'>,
  ): Promise<Mensaje> {
    return this.empleadoRepository.mensajes(id).create(mensaje);
  }

  @patch('/empleados/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Empleado.Mensaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {partial: true}),
        },
      },
    })
    mensaje: Partial<Mensaje>,
    @param.query.object('where', getWhereSchemaFor(Mensaje)) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.empleadoRepository.mensajes(id).patch(mensaje, where);
  }

  @del('/empleados/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Empleado.Mensaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mensaje)) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.empleadoRepository.mensajes(id).delete(where);
  }
}
