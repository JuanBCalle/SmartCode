import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'smartCodeDB',
  connector: 'mongodb',
  url: 'mongodb+srv://Developer:ProgramadorWeb@cluster0.ib4lt.mongodb.net/smartCodeDB?retryWrites=true&w=majorit',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SmartCodeDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'smartCodeDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.smartCodeDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
