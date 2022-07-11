import DuckbotClient from './structs/duckbot-client';

const duckbot = new DuckbotClient();

duckbot
  .init()
  .start()
  .catch((error) => {
    duckbot.logger.error(error);
    process.exit(0);
  });
