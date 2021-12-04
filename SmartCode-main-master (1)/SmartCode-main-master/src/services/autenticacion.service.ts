import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';

const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository(EmpleadoRepository)
    public empleado: EmpleadoRepository
  ) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador();
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5().toString();
    return claveCifrada;
  }

  IdentificarEmpleado(usuario: string, pass: string) {
    try {
      let p = this.empleado.findOne({where: {Nombres: usuario, clave: pass}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(empleado: Empleado) {
    let token = jwt.sign({
      data: {
        id: empleado.Id,
        nombre: empleado.Nombres + "" + empleado.Apellidos
      }
    },
      Llaves.claveJWT);
    return token;
  }

  ValidarToken(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }


}
