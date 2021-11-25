import { /* inject, */ BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  EnviarMensajePorSMS(telefono: string, body: string) {
    const accountSid = 'ACc93bf2d968e3f3f7dc81afa861545f1c';
    const authToken = 'b29be374591a1fa11e6718083a60195e';
    const twilio = require('twilio');
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: body,
        from: '+19142923108',
        to: '+57' + telefono
      })
      .then((message: any) => console.log(message.sid));
  }

}
