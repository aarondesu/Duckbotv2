import { Collection } from 'discord.js';
import { EventEmitter } from 'node:events';

import DuckbotClient from '../duckbot-client';
import DuckbotHandler from '../duckbot-handler';
import DuckbotModule from '../duckbot-module';
import EventModule from '../modules/event-module';

export default class EventHandler extends DuckbotHandler {
  emitters: Collection<string, EventEmitter>;

  constructor(client: DuckbotClient, directory: string) {
    super('eventHandler', {
      client,
      classToHandle: EventModule,
      directory,
    });

    this.emitters = new Collection<string, EventEmitter>();
    this.emitters.set('client', this.client);

    this.setHandlerAsEmitter(this);
  }

  register(module: DuckbotModule, filePath: string): DuckbotModule {
    super.register(module, filePath);

    this.addToEmitter(module as EventModule);
    return module;
  }

  addToEmitter(event: EventModule) {
    const emitter = this.emitters.get(event.emitter);
    if (!emitter) throw new Error(`Emitter ${event.emitter} does not exist!`);

    const boundExec = event.exec.bind(event);

    if (event.type === 'once') {
      emitter.once(event.event, () => boundExec);
      return event;
    }

    emitter.on(event.event, boundExec);
    return event;
  }

  setHandlerAsEmitter(handler: DuckbotHandler) {
    this.emitters.set(handler.id, handler);
  }
}
