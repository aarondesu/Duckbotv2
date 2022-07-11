import moment from 'moment-timezone';
import { CronJob } from 'cron';
import { isValidCron } from 'cron-validator';

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

        const tz = cronJob.timezone;

        // Validate the time zone
        if (tz && !!moment.tz.zone(tz as string) === false) {
          throw new Error(
            'Invalid timezone! Please refer to https://momentjs.com/timezone/ for valid timezones.',
          );
        }

        if (isValidCron(cronJob.schedule)) {
          // Schedule the cron
          cronJob.task = new CronJob(
            cronJob.schedule,
            () => cronJob.exec(),
            null,
            false,
            cronJob.timezone,
          );

          cronJob.task.start();
        } else {
          throw new Error('Invalid cron job schedule. Please check https://crontab.guru/');
        }
      }
    } catch ({ stack }) {
      this.client.logger.info(stack as string);
    }
  }

  emitError(module: CronJobModule, stack: string) {
    this.emit('cronjobError', module.constructor.name, stack);
  }
}
