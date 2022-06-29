import CronJobModule from '../strcuts/modules/cronjob-module';

export default class TestJob extends CronJobModule {
  message: string;

  constructor() {
    super('test', {
      schedule: '* * * * * *',
      timezone: 'Asia/Hong_Kong',
    });
  }

  init(): void {
    // TODO
    this.message = 'test';
  }

  exec(): void {
    this.client.logger.info(this.message);
  }
}
