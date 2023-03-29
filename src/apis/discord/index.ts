import { Client, type TextChannel, IntentsBitField } from 'discord.js';

class DiscordBot extends Client {
  admin;

  constructor() {
    const clientOptions: any = {
      intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages], // Add any other required intents
    };

    super(clientOptions);

    void this.start();
  }

  async sendTestMessage(channel: TextChannel): Promise<void> {
    const content: string = 'Hello, this is a test message!';
    try {
      await channel.send(content);
      console.log('Message sent successfully!');
    } catch (error: any) {
      console.error('Error sending message:', error);
    }
  }

  async start(): Promise<void> {
    try {
      await this.login(process.env.DISCORD_BOT_TOKEN as string);
      console.log(`Logged in as ${this.user?.tag}`);
    } catch (error: any) {
      console.error('Error logging in:', error);
    }
  }
}

export default new DiscordBot();
