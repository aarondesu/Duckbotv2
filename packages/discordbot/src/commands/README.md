# Slash command guide

Follow [Discord.js command creation](https://discordjs.guide/interactions/slash-commands.html#guild-commands) for command creation.

### Basic Command

```typescript
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import CommandModule from '../strucutres/commands/command-module';

export default class TestCommand extends CommandModule {
  constructor() {
    super(
      'ping',
      new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong command')
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async exec(_interaction: CommandInteraction): Promise<void> {
    await _interaction.reply('pong');
  }
}
```
