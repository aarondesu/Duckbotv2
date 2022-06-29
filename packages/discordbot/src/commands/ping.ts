/* eslint-disable @typescript-eslint/no-empty-function */
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import CommandModule from '../strcuts/modules/command-module';

export default class PingCommand extends CommandModule {
  constructor() {
    super('ping', new SlashCommandBuilder().setName('ping').setDescription('Ping pong command'));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line class-methods-use-this
  async exec(_interaction: CommandInteraction): Promise<void> {
    await _interaction.reply('pong');
  }
}
