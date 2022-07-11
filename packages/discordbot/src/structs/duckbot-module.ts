import DuckbotClient from './duckbot-client';
import DuckbotHandler from './duckbot-handler';

export default class DuckbotModule {
  id: string;

  client: DuckbotClient;

  handler: DuckbotHandler;

  filePath: string;

  constructor(id: string) {
    this.id = id;
    this.client = null;
    this.handler = null;
    this.filePath = '';
  }
}
