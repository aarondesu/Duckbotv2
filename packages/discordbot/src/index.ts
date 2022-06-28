import DuckbotClient from './strcuts/duckbot-client';

const duckbot = new DuckbotClient();

duckbot
  .init()
  .start()
  .catch((error) => {
    duckbot.logger.error(error);
    process.exit(0);
  });
