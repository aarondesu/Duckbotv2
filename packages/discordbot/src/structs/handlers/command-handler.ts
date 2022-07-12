import { Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import DuckbotClient from '../duckbot-client';
import DuckbotHandler from '../duckbot-handler';
import CommandModule from '../modules/command-module';

import { guildId, token } from '../../config';

export default class CommandHandler extends DuckbotHandler {
  commands: SlashCommandBuilder[];

  constructor(client: DuckbotClient, directory: string) {
    super('commandHandler', {
      client,
      classToHandle: CommandModule,
      directory,
    });

    this.client.once('ready', () => this.setupCommands());
    this.client.on('interactionCreate', (interaction) => this.handleCommands(interaction));
  }

  async setupCommands() {
    const clientid = this.client.user.id;
    let commands = [];

    for (const [, module] of this.modules) {
      const command = module as CommandModule;
      if (!command) {
        throw new Error(`Command ${command.id} has invalid command data.`);
      }

      commands.push(command.data);
    }

    commands = commands.map((command) => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(token);

    if (process.env.NODE_ENV === 'development') {
      // Register to test server commands
      await rest
        .put(Routes.applicationGuildCommands(clientid, guildId), {
          body: commands,
        })
        .then(() => this.client.logger.info('Successfully registered application commands!'))
        .catch(({ stack }) => this.client.logger.error(stack as string));
    } else {
      // Register To global commands
      await rest
        .put(Routes.applicationCommands(clientid), {
          body: commands,
        })
        .then(() => this.client.logger.info('Successfully registered global commands!'))
        .catch(({ stack }) => this.client.logger.error(stack as string));
    }
  }

  async handleCommands(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = this.modules.get(commandName) as CommandModule;

    if (!command) {
      await interaction.reply(`Failed to use command ${commandName}`);
    }

    await command
      .exec(interaction)
      .catch((error: Error) => this.emitError(command, error, interaction));
  }

  emitError(command: CommandModule, error: Error, interaction: Interaction) {
    this.emit('commandError', command.constructor.name, error, interaction);
  }
}
