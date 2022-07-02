import EventModule from '../strcuts/modules/event-module';

export default class CronjobError extends EventModule {
  constructor() {
    super('cronjobErrorListener', {
      emitter: 'cronjobHandler',
      event: 'cronjobError',
      type: 'on',
    });
  }

  exec(moduleName: string, stack: string): void {
    this.client.logger.error(`Error occured on CronJob ${moduleName} \n${stack}`);
  }
}
