import EventModule from '../structs/modules/event-module';

export default class Startup extends EventModule {
  constructor() {
    super('startup', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec(): void {
    this.client.logger.info(`Logged in as user: ${this.client.user?.username}`);

    this.client.user.setPresence({
      activities: [
        {
          name: 'Leading duckings  🦆',
          type: 'PLAYING',
        },
      ],
      status: 'online',
    });
  }
}
