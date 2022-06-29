import { Client, Collection, Intents } from 'discord.js';
import { Logger } from 'winston';
import path from 'node:path';

import DuckbotHandler from './duckbot-handler';
import CommandHandler from './handlers/command-handler';

import logger from '../lib/logger';
import { token } from '../config';
import EventHandler from './handlers/event-handler';
import CronJobHandler from './handlers/cronjob-handler';

export default class DuckbotClient extends Client {
  handlers: Collection<string, DuckbotHandler>;

  logger: Logger;

  constructor() {
    super({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES],
      partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'REACTION'],
    });

    this.handlers = new Collection<string, DuckbotHandler>();
    this.logger = logger;
  }

  init() {
    const commandHandler = new CommandHandler(this, path.resolve(__dirname, '..', 'commands'));

    const eventHandler = new EventHandler(this, path.resolve(__dirname, '..', 'events'));

    const cronjobHandler = new CronJobHandler(this, path.resolve(__dirname, '..', 'jobs'));

    eventHandler.setHandlerAsEmitter(commandHandler);
    eventHandler.setHandlerAsEmitter(cronjobHandler);

    this.handlers.set(commandHandler.id, commandHandler);
    this.handlers.set(eventHandler.id, eventHandler);
    this.handlers.set(cronjobHandler.id, cronjobHandler);

    return this;
  }

  async start() {
    this.logger.info('Starting bot...');
    this.logger.info('Loading modules...');

    for (const [name, handler] of this.handlers) {
      try {
        handler.loadModules();
        this.logger.info(`Loaded ${handler.modules.size} modules for ${handler.constructor.name}`);
      } catch ({ stack }) {
        throw new Error(`Error loading module ${name}. Reason: \n${stack as string}`);
        return;
      }
    }

    this.logger.info('Logging into discord...');
    await this.login(token);
  }
}
