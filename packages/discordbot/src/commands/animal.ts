/* eslint-disable @typescript-eslint/no-empty-function */
import { SlashCommandBuilder } from '@discordjs/builders';
import {
  CommandInteraction, Message, MessageActionRow, MessageSelectMenu,
} from 'discord.js';

import CommandModule from '../strcuts/modules/command-module';
import {
  bunny, cat, dog, duck, fox, panda,
} from '../lib/animal-api';

export default class AnimalCommand extends CommandModule {
  selectMenu: MessageSelectMenu;

  constructor() {
    super(
      'animal',
      new SlashCommandBuilder()
        .setName('animal')
        .setDescription('Generates a random image depending on the animal selected.'),
    );

    this.selectMenu = new MessageSelectMenu().setCustomId('animal').addOptions(
      {
        label: 'Cat',
        value: 'cat',
      },
      {
        label: 'Bunny',
        value: 'bunny',
      },
      {
        label: 'Fox',
        value: 'fox',
      },
      {
        label: 'Panda',
        value: 'panda',
      },
      {
        label: 'Duck',
        value: 'duck',
      },
    );
  }

  static async getResult(animal: string) {
    let result: string | undefined;

    switch (animal) {
      case 'cat':
        result = await cat();
        break;
      case 'dog':
        result = await dog();
        break;
      case 'bunny':
        result = await bunny();
        break;
      case 'fox':
        result = await fox();
        break;
      case 'panda':
        result = await panda();
        break;
      case 'duck':
        result = await duck();
        break;
      default:
        result = undefined;
        break;
    }

    return result;
  }

  async exec(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply();

    const message = (await interaction.editReply({
      content: 'Which Animal',
      components: [new MessageActionRow().addComponents(this.selectMenu)],
    })) as Message;

    const collector = message.createMessageComponentCollector({
      componentType: 'SELECT_MENU',
      max: 1,
      time: 15000,
    });

    collector.on('collect', async (i) => {
      if (i.user.id !== interaction.user.id && !i.isSelectMenu()) return;

      const animal = i.values?.toString();
      const result = await AnimalCommand.getResult(animal);

      if (!result) {
        await interaction.editReply('Unable to retrieve animal');
      } else {
        await interaction.editReply({ content: result, components: [] });
      }

      collector.stop();
    });

    collector.on('end', async () => {
      if (collector.ended && collector.collected.size === 0) {
        await interaction.deleteReply();
      }
    });
  }
}
