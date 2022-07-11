import EventModule from '../structs/modules/event-module';

export default class CronjobError extends EventModule {
  constructor() {
    super('cronjobErrorListener', {
      emitter: 'cronjobHandler',
      event: 'cronjobError',
      type: 'on',
    });
  }

  exec(moduleName: string, stack: string): void {
    this.client.logger.error(`Error occured on Cron Job ${moduleName} \n${stack}`);
  }
}
