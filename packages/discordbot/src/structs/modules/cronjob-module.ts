import { Timezone } from 'tz-offset';
import { CronJob } from 'cron';

import DuckbotModule from '../duckbot-module';

interface CronJobOptions {
  schedule: string;
  timezone: Timezone;
}

export default class CronJobModule extends DuckbotModule {
  schedule: string;

  timezone: Timezone;

  task: CronJob;

  constructor(id: string, options?: CronJobOptions) {
    super(id);

    this.schedule = options.schedule;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.timezone = options.timezone ? options.timezone : 'Etc/UTC';
  }

  init() {
    throw new Error(`CronJob ${this.constructor.name} initialize is not yet implemented`);
  }

  exec() {
    throw new Error(`CronJob ${this.constructor.name} exec is not yet implemented`);
  }
}
