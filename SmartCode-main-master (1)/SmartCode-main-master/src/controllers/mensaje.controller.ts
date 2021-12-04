import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Mensaje} from '../models';
import {EmpleadoRepository, MensajeRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class MensajeController {
  constructor(
    @repository(MensajeRepository)
    public mensajeRepository: MensajeRepository,
    @service(NotificacionesService)
    public notificaciones: NotificacionesService,
    @repository(EmpleadoRepository)
    public empleado: EmpleadoRepository,
  ) { }

  @post('/mensajes')
  @response(200, {
    description: 'Mensaje model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mensaje)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {
            title: 'NewMensaje',
            exclude: ['id'],
          }),
        },
      },
    })
    mensaje: Omit<Mensaje, 'id'>,
  ): Promise<Mensaje> {
    let empleadoEncontrado = this.empleado.findById(mensaje.empleadoId);
    if (empleadoEncontrado) {
      let telefono: string = (await empleadoEncontrado).Telefono;
      this.notificaciones.EnviarMensajePorSMS(mensaje.body, telefono);
      return this.mensajeRepository.create(mensaje);
    }
    return mensaje;

  }

  @get('/mensajes/count')
  @response(200, {
    description: 'Mensaje model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mensaje) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.mensajeRepository.count(where);
  }

  @get('/mensajes')
  @response(200, {
    description: 'Array of Mensaje model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mensaje, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mensaje) filter?: Filter<Mensaje>,
  ): Promise<Mensaje[]> {
    return this.mensajeRepository.find(filter);
  }

  @patch('/mensajes')
  @response(200, {
    description: 'Mensaje PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {partial: true}),
        },
      },
    })
    mensaje: Mensaje,
    @param.where(Mensaje) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.mensajeRepository.updateAll(mensaje, where);
  }

  @get('/mensajes/{id}')
  @response(200, {
    description: 'Mensaje model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mensaje, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mensaje, {exclude: 'where'}) filter?: FilterExcludingWhere<Mensaje>
  ): Promise<Mensaje> {
    return this.mensajeRepository.findById(id, filter);
  }

  @patch('/mensajes/{id}')
  @response(204, {
    description: 'Mensaje PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {partial: true}),
        },
      },
    })
    mensaje: Mensaje,
  ): Promise<void> {
    await this.mensajeRepository.updateById(id, mensaje);
  }

  @put('/mensajes/{id}')
  @response(204, {
    description: 'Mensaje PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensaje: Mensaje,
  ): Promise<void> {
    await this.mensajeRepository.replaceById(id, mensaje);
  }

  @del('/mensajes/{id}')
  @response(204, {
    description: 'Mensaje DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensajeRepository.deleteById(id);
  }
}
