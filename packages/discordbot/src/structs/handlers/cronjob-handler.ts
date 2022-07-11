import moment from 'moment-timezone';
import cron from 'node-cron';

import DuckbotClient from '../duckbot-client';
import DuckbotHandler from '../duckbot-handler';
import CronJobModule from '../modules/cronjob-module';

export default class CronJobHandler extends DuckbotHandler {
  constructor(client: DuckbotClient, directory: string) {
    super('cronjobHandler', {
      client,
      directory,
      classToHandle: CronJobModule,
    });

    this.client.once('ready', () => this.initializeJobs());
  }

  initializeJobs() {
    try {
      for (const [, data] of this.modules) {
        const cronJob = data as CronJobModule;
        cronJob.init();

        const valid = cron.validate(cronJob.schedule);
        const tz = cronJob.timezone;

        // Validate the time zone
        if (tz && !!moment.tz.zone(tz as string) === false) {
          throw new Error('Invalid timezone! Please refer to https://momentjs.com/timezone/ for valid timezones.');
        }

        if (valid) {
          // Schedule the cron
          cronJob.task = cron.schedule(cronJob.schedule, () => cronJob.exec(), {
            scheduled: true,
            timezone: cronJob.timezone,
          });

          cronJob.task.start();
        } else {
          throw new Error('Invalid cron job schedule. Please check https://www.npmjs.com/package/node-cron');
        }
      }
    } catch ({ stack }) {
      this.client.logger.info(`Error initializing. ${stack as string}`);
    }
  }

  emitError(module: CronJobModule, stack: string) {
    this.emit('cronjobError', module.constructor.name, stack);
  }
}
