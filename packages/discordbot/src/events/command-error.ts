import { CommandInteraction, MessageEmbed } from 'discord.js';

import EventModule from '../strcuts/modules/event-module';

export default class CommandErrorEvent extends EventModule {
  constructor() {
    super('commandError', {
      emitter: 'commandHandler',
      event: 'commandError',
    });
  }

  async exec(
    comnmandName: string,
    errorStack: string,
    interaction: CommandInteraction,
  ): Promise<void> {
    this.client.logger.error(
      `Failed to process command "${comnmandName}". \nReason ${errorStack}`,
    );

    const embed = new MessageEmbed()
      .setColor('DARK_RED')
      .setTitle('Oops and error has occured!')
      .setDescription(`Failed to process command "${comnmandName}"`)
      .setFooter({ text: 'Command Eror' })
      .setTimestamp();

    if (interaction.deferred) {
      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.reply({ embeds: [embed] });
    }
  }
}
