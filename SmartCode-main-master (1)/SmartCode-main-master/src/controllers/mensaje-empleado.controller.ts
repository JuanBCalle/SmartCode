import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Empleado, Mensaje
} from '../models';
import {MensajeRepository} from '../repositories';

export class MensajeEmpleadoController {
  constructor(
    @repository(MensajeRepository)
    public mensajeRepository: MensajeRepository,
  ) { }

  @get('/mensajes/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Mensaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Mensaje.prototype.id,
  ): Promise<Empleado> {
    return this.mensajeRepository.empleado(id);
  }
}
