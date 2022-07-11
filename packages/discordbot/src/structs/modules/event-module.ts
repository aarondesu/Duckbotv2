/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import DuckbotModule from '../duckbot-module';

declare type ListenerType = 'on' | 'once';

interface TestOptions {
  emitter: string;
  event: string;
  type?: ListenerType;
}

export default class EventModule extends DuckbotModule {
  event: string;

  emitter: string;

  type: ListenerType;

  constructor(id: string, options?: TestOptions) {
    super(id);

    this.event = options.event;
    this.emitter = options.emitter;
    this.type = options.type;
  }

  exec(..._args: unknown[]) {
    throw new Error(`Event ${this.constructor.name} exec command not yet implemented.`);
  }
}
