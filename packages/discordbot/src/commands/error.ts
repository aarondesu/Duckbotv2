/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-empty-function */
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import CommandModule from '../strcuts/modules/command-module';

export default class ErrorCommand extends CommandModule {
  constructor() {
    super(
      'error',
      new SlashCommandBuilder()
        .setName('error')
        .setDescription('For testing error command handling')
        .setDefaultMemberPermissions(0),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async exec(_interaction: CommandInteraction): Promise<void> {
    throw new Error('Testing command 123123213');
  }
}
