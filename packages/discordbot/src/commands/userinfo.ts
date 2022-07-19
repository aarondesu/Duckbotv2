import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed, User } from 'discord.js';

import CommandHandler from '../structs/handlers/command-handler';
import CommandModule from '../structs/modules/command-module';

export default class UserInfo extends CommandModule {
  constructor() {
    super(
      'userinfo',
      new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get information regarding the user.')
        .addUserOption((option) => option.setName('user').setDescription('Targetted user')),
    );
  }

  async exec(interaction: CommandInteraction): Promise<void> {
    try {
      await interaction.deferReply();

      const { guild } = interaction;
      const userArgs = interaction.options.getUser('user');

      let user: User;

      if (userArgs) {
        user = await this.client.users.fetch(userArgs);
      } else {
        user = interaction.user;
      }

      const guildUser = guild?.members.cache.get(user.id);

      const embed = new MessageEmbed()
        .setAuthor({
          name: user.tag,
          iconURL: user.avatarURL(),
        })
        .setThumbnail(user.avatarURL())
        .addFields(
          { name: 'ID', value: user.id },
          {
            name: 'Status',
            value: guildUser.presence.status,
            inline: true,
          },
          {
            name: 'Nickname',
            value: guildUser.nickname || guildUser.displayName,
            inline: true,
          },
          {
            name: 'Account Created',
            value: user.createdAt.toLocaleString(),
          },
          {
            name: 'Join Date',
            value: guildUser.joinedAt.toLocaleString(),
          },
        )
        .setTimestamp()
        .setFooter({ text: 'User info' });

      await interaction.editReply({
        embeds: [embed],
      });
    } catch (error) {
      (this.handler as CommandHandler).emitError(this, error as Error, interaction);
    }
  }
}
