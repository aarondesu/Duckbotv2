import { EmbedAuthorData, EmbedFooterData } from '@discordjs/builders';
import { ColorResolvable, EmbedFieldData, MessageEmbed } from 'discord.js';

export function dateToString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export interface EmbedBuilderUtilOptions {
  title: string;
  color?: ColorResolvable;
  author?: EmbedAuthorData;
  icon?: string;
  thumbnail?: string;
  image?: string;
  description?: string;
  fields?: EmbedFieldData[];
  footer?: EmbedFooterData;
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

  if (options.author) messageEmbed.setAuthor(options.author);
  if (options.fields) messageEmbed.addFields(options.fields);
  if (options.footer) messageEmbed.setFooter(options.footer);
  if (options.timestamp) messageEmbed.setTimestamp();

  return messageEmbed;
};
