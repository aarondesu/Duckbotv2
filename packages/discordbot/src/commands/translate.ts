/* eslint-disable @typescript-eslint/no-empty-function */
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import DetectLanguage from 'detectlanguage';
import axios, { AxiosRequestConfig } from 'axios';

import CommandModule from '../structs/modules/command-module';
import { detectlanguageApi, rapidApiKey } from '../config';

type DeepLTranslate = {
  data: {
    translations: {
      translatedText: string;
    };
  };
};

export default class TranslateCommand extends CommandModule {
  languageApi: DetectLanguage;

  constructor() {
    super(
      'translate',
      new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translates text to a language chosen')
        .addStringOption((op) => op
          .setName('language')
          .setDescription('Language to translate to')
          .setRequired(true)
          .addChoices({ name: 'English', value: 'EN' }, { name: 'Japanese', value: 'JA' }))
        .addStringOption((op) => op.setName('text').setDescription('Text that will be translated').setRequired(true)),
    );

    this.languageApi = new DetectLanguage(detectlanguageApi);
  }

  async detectLanguage(textToTranslate: string) {
    this.client.logger.http('Requesting language code from detectlanguage.com...');

    try {
      const result = await this.languageApi.detect(textToTranslate);
      const langSource = result.pop()?.language;

      this.client.logger.http(`Detected lanaguage as ${langSource}`);

      return langSource;
    } catch ({ message }) {
      this.client.logger.error('DetectLanguage API call Failed');
      throw new Error(message as string);
    }
  }

  async translateText(sourceText: string, sourceLang: string, targetLang: string) {
    this.client.logger.http('Sending requesting to rapid_api/deepL...');

    const requestConf: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
      },
      data: {
        q: sourceText,
        source: sourceLang,
        target: targetLang,
      },
    };

    try {
      const result = await axios.request<DeepLTranslate>(requestConf);
      this.client.logger.http('Successfully recieved data from deepL api!');

      return result.data.data.translations.translatedText;
    } catch ({ message }) {
      this.client.logger.error('DetectLanguage API call Failed');
      throw new Error(message as string);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async exec(interaction: CommandInteraction): Promise<void> {
    const targetLang = interaction.options.getString('language');
    const sourceText = interaction.options.getString('text');

    await interaction.deferReply();

    try {
      const detectedLang = await this.detectLanguage(sourceText);
      const translatedText = await this.translateText(
        sourceText,
        detectedLang.toUpperCase(),
        targetLang.toUpperCase(),
      );

      await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setDescription(translatedText)
            .setTimestamp()
            .setFooter({ text: 'Translated using DeepL' }),
        ],
      });
    } catch ({ message, stack }) {
      this.client.logger.error(`Failed to translate. Reason: \n${stack as string}`);
      await interaction.editReply(`Failed to translate. Reason\n${message as string}`);
    }
  }
}
