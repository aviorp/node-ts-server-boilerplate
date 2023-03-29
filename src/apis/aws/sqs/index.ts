import { consola } from 'consola';
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand, CreateQueueCommand } from '@aws-sdk/client-sqs';
import { OPTIONS } from '../constants.js';
import { type SqsNames } from '#types/index.js';

class SqsClient extends SQSClient {
  queueUrl: string = '';

  constructor(queueName: keyof SqsNames) {
    super(OPTIONS);
    void this.createQueue(queueName);
  }

  async sendMessage(body: any): Promise<any> {
    const payload = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(body),
    });
    const response = await this.send(payload);
    consola.info(`Message sent to SQS, MessageId: ${response.MessageId} `);
    return response;
  }

  async receiveMessage(): Promise<any> {
    const command = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
    });
    const response = await this.send(command);
    if (response.Messages) {
      const messages: any = [];
      response.Messages.forEach(async (message) => {
        // Process the received message
        console.log('Received message:', JSON.parse(message.Body as string));
        messages.push(message);
        // Delete the received message
        await this.deleteMessage(message.ReceiptHandle as string);
      });
      return messages;
    } else {
      return 'No messages received';
    }
  }

  async deleteMessage(ReceiptHandle: string): Promise<any> {
    const payload = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle,
    });
    await this.send(payload);
  }

  async createQueue(QueueName: string): Promise<any> {
    const payload = new CreateQueueCommand({ QueueName });
    const { QueueUrl } = await this.send(payload);
    this.queueUrl = QueueUrl as string;
    consola.info(`New SQS Created , QueueUrl: ${this.queueUrl}`);
  }
}

export default SqsClient;
