import dotenv from 'dotenv';
import path from 'node:path';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: path.resolve(__dirname, '../../../', '.env'),
  });
}

export const token: string = process.env.DISCORD_TOKEN;
export const clientId: string = process.env.DISCORD_CLIENT_ID;
export const guildId: string = process.env.GUILD_DEV;
export const detectlanguageApi: string = process.env.DETECTLANGUAGE_API_KEY;
export const rapidApiKey: string = process.env.RAPID_API_KEY;
