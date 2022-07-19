import EventModule from '../structs/modules/event-module';

export default class InteralErrorEvent extends EventModule {
  constructor() {
    super('internalError', {
      emitter: 'client',
      event: 'internalError',
    });
  }

  exec(error: Error) {
    const { stack } = error;

    this.client.logger.error(`Internal error occured. ${stack}`);

    // TODO: use webhooks to report internal errors to discord channel
  }
}
