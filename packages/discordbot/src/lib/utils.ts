import { ColorResolvable, EmbedFieldData, MessageEmbed } from 'discord.js';

export function dateToString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export interface EmbedBuilderUtilOptions {
  title: string;
  color?: ColorResolvable;
  author?: string;
  icon?: string;
  thumbnail?: string;
  image?: string;
  description?: string;
  fields?: EmbedFieldData[];
  footer?: string;
  footerIcon?: string;
  timestamp?: boolean;
  url?: string;
}

export const EmbedBuilderUtil = (options: EmbedBuilderUtilOptions) => {
  const messageEmbed = new MessageEmbed();

  messageEmbed
    .setColor(options.color || 'GREY')
    .setTitle(options.title || '')
    .setThumbnail(options.thumbnail || '')
    .setDescription(options.description || '')
    .setImage(options.image || '')
    .setURL(options.url || '');

  if (options.author) {
    if (options.icon !== undefined) {
      messageEmbed.setAuthor({ name: options.author, iconURL: options.icon });
    } else {
      messageEmbed.setAuthor({ name: options.author });
    }
  }

  if (options.footer) {
    if (options.footerIcon !== undefined) {
      messageEmbed.setFooter({ text: options.footer, iconURL: options.footerIcon });
    } else {
      messageEmbed.setFooter({ text: options.footer });
    }
  }

  if (options.timestamp) messageEmbed.setTimestamp();
  if (options.fields) messageEmbed.addFields(options.fields);

  return messageEmbed;
};
