import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';

import CommandModule from '../strcuts/modules/command-module';

export default class TestCommand extends CommandModule {
  constructor() {
    super('info', new SlashCommandBuilder().setName('info').setDescription('Ping pong command'));
  }

  async exec(interaction: CommandInteraction): Promise<void> {
    const owner = await this.client.users.fetch('161427536096526336');

    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setURL('https://github.com/Shinudesu/Duckbotv2')
      .setThumbnail(this.client.user.avatarURL())
      .setTitle('Duck Bot')
      .setDescription('Discord bot for Rappy a la Mode!')
      .setTimestamp()
      .setFooter({ text: `Developed by ${owner.tag}`, iconURL: owner.avatarURL() })
      .addFields(
        {
          name: 'Report issues',
          value: '[Click Here](https://github.com/Shinudesu/DuckBotv2/issues)',
          inline: true,
        },
        {
          name: 'Source',
          value: '[Click Here](https://github.com/Shinudesu/DuckBotv2)',
          inline: true,
        },
      );

    await interaction.reply({
      embeds: [embed],
    });
  }
}
