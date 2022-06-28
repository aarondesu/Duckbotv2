/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SlashCommandBuilder, SlashCommandNumberOption } from '@discordjs/builders';
import { Interaction } from 'discord.js';

import DuckbotModule from '../duckbot-module';

export default class CommandModule extends DuckbotModule {
  description: string;

  permission: bigint;

  data: SlashCommandNumberOption | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

  constructor(
    id: string,
    data?: SlashCommandNumberOption | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>,
  ) {
    super(id);

    this.data = data;
  }

  // to be overriden
  // eslint-disable-next-line @typescript-eslint/require-await
  async exec(_interaction: Interaction) {
    throw new Error(`Exec not yet implemented for ${this.id}`);
  }
}
