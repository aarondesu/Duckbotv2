/* eslint-disable no-continue */
import { Collection, Snowflake, TextChannel } from 'discord.js';
import moment from 'moment-timezone';

import CronJobModule from '../strcuts/modules/cronjob-module';

import json from '../json/reminders.json';
import CronJobHandler from '../strcuts/handlers/cronjob-handler';
import { EmbedBuilderUtil } from '../lib/utils';

declare type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface Time {
  hours: number[];
  seconds?: number[];
  daysOfWeek?: Day[];
  days?: number[];
}

interface Field {
  name: string;
  value: string;
  inline?: boolean;
}

interface Content {
  title?: string;
  thumbnail?: string;
  message?: string;
  image?: string;
  fields?: Field[];
}

interface Schedule {
  name: string;
  time: Time;
  content: Content;
}

declare type JSONDeclaration = Schedule[];

export default class ReminderJob extends CronJobModule {
  reminders: Collection<string, Schedule>;

  channels: Collection<Snowflake, TextChannel>;

  constructor() {
    super('reminder', {
      schedule: '* * * * *',
      timezone: 'Asia/Tokyo',
    });

    this.reminders = new Collection<string, Schedule>();
    this.channels = new Collection<Snowflake, TextChannel>();
  }

  init() {
    // Get data from JSON file
    const schedule: JSONDeclaration = [...json] as JSONDeclaration;

    for (const sched of schedule) {
      this.reminders.set(sched.name, sched);
    }

    const cache = this.client.channels.cache.filter((ch) => ch.type === 'GUILD_TEXT') as Collection<
    Snowflake,
    TextChannel
    >;

    this.channels = cache.filter((ch) => ch.name === 'general');
  }

  // eslint-disable-next-line class-methods-use-this
  exec() {
    try {
      const sendMessage = [];

      for (const [, schedule] of this.reminders) {
        const currentTime = moment.tz(moment(), 'Asia/Tokyo');

        // Check if reminder has days set
        if (schedule.time.days && schedule.time.days.length > 0) {
          // Checks if the day doesn't include today, if not skip this reminder
          if (!schedule.time.days?.includes(Number(currentTime.format('DD')))) continue;
        }

        // Check if reminder has day of week set
        if (schedule.time.daysOfWeek && schedule.time.daysOfWeek?.length > 0) {
          if (!schedule.time.daysOfWeek.includes(currentTime.format('dddd').toLowerCase() as Day)) continue;
        }

        if (schedule.time.hours.includes(Number(currentTime.format('HH')))) {
          const embed = EmbedBuilderUtil({
            color: 'BLUE',
            title: schedule.content.title,
            description: schedule.content.message,
            thumbnail: schedule.content.thumbnail,
            image: schedule.content.image,
            footer: 'Daily reminder',
            timestamp: true,
            fields: schedule.content.fields,
          });

          for (const [, channel] of this.channels) {
            sendMessage.push(channel.send({ embeds: [embed] }));
          }
        }
      }
    } catch ({ stack }) {
      (this.handler as CronJobHandler).emitError(this, stack as string);
    }
  }
}
