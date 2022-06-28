/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Collection } from 'discord.js';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import Module from 'node:module';
import path from 'node:path';

import DuckbotClient from './duckbot-client';
import DuckbotModule from './duckbot-module';

interface DuckbotHandlerOptions {
  client: DuckbotClient;
  classToHandle: typeof DuckbotModule;
  directory: string;
}

export default class DuckbotHandler extends EventEmitter {
  id: string;

  client: DuckbotClient;

  modules: Collection<string, DuckbotModule>;

  classToHandle: typeof DuckbotModule;

  directory: string;

  extensions: string[];

  constructor(id: string, options: DuckbotHandlerOptions) {
    super();

    this.id = id;
    this.client = options.client;

    this.modules = new Collection<string, DuckbotModule>();
    this.classToHandle = options.classToHandle;
    this.directory = options.directory;
    this.extensions = ['.js', '.json', '.ts'];
  }

  loadModules() {
    try {
      // Loads all modules from specified path
      const files = fs.readdirSync(this.directory).filter((file) => {
        const lastIndex = file.lastIndexOf('.');
        return (
          lastIndex !== 1
          && this.extensions?.includes(file.substring(lastIndex))
        );
      });

      for (const file of files) {
        const filePath = path.join(this.directory, file);
        // eslint-disable-next-line global-require
        const module = new (require(filePath).default)() as Module;

        if (module instanceof this.classToHandle) {
          this.register(module, filePath);
        } else {
          throw new Error("Module type isn't being handled by this handler.");
        }
      }
    } catch ({ stack }) {
      throw new Error(
        `Error loading module ${this.id}\n Reason: ${stack as string}`,
      );
    }
  }

  register(module: DuckbotModule, filePath: string): DuckbotModule {
    if (this.modules.has(module.id)) {
      this.client.logger.error(
        `${module.id} module already exists within ${this.id} !`,
      );
      return null;
    }

    module.handler = this;
    module.client = this.client;
    module.filePath = filePath;

    this.modules.set(module.id, module);
    return module;
  }
}
