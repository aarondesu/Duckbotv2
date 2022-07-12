import { CommandInteraction } from 'discord.js';

import EventModule from '../structs/modules/event-module';
import { EmbedBuilderUtil } from '../lib/utils';

export default class CommandErrorEvent extends EventModule {
  constructor() {
    super('commandError', {
      emitter: 'commandHandler',
      event: 'commandError',
    });
  }

  async exec(commandName: string, error: Error, interaction: CommandInteraction): Promise<void> {
    // Emit internal error for logging
    this.client.emit('internalError', error);

    const embed = EmbedBuilderUtil({
      color: 'DARK_RED',
      title: 'Oops an error has occured!',
      description: `Failed to process command ${commandName}`,
      timestamp: true,
    });

    if (interaction.deferred) {
      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.reply({ embeds: [embed] });
    }
  }
}
