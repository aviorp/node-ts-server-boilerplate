import { v4 } from 'uuid';
import { LambdaClient, UpdateFunctionConfigurationCommand } from '@aws-sdk/client-lambda';
import { DynamoDBClient, ExecuteStatementCommand } from '@aws-sdk/client-dynamodb';
import axios from 'axios';
import { Client, IntentsBitField } from 'discord.js';

class DiscordBot extends Client {
  constructor() {
    const clientOptions = {
      intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages], // Add any other required intents
    };
    super(clientOptions);
    this.start();
  }

  async start() {
    try {
      await this.login('MTEyMTE2MTQ5MDkzOTAwMjk1NQ.GKz7TN.VXBdywYisT_6SXS_Pl10lgAOmluhjqBL3SpsXc');
      console.log(`Logged in as ${this.user?.tag}`);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
}

export const discordBot = new DiscordBot();
const client = new LambdaClient();
const dbClient = new DynamoDBClient();

export function generateId() {
  return v4();
}

export function convertToSingleQuotes(jsonObject) {
  const jsonString = JSON.stringify(jsonObject);
  const singleQuotedString = jsonString.replace(/"/g, "'");
  return singleQuotedString;
}

export async function updateLambdaFunction(fnName) {
  const response = await client.send(
    new UpdateFunctionConfigurationCommand({
      FunctionName: fnName,
      Description: `Last updated at ${new Date().toISOString()}`,
    }),
  );
  return response;
}

export async function executeStatement(statement) {
  const command = new ExecuteStatementCommand({
    Statement: statement,
  });
  const response = await dbClient.send(command);
  return response;
}

const captchaInstance = axios.create({
  baseURL: 'http://2captcha.com',
  params: {
    key: '9cb8b89b5e8d1c49e23e537a280954cf',
    json: true,
  },
});
captchaInstance.interceptors.response.use(response => response.data);

const STATUS = {
  CAPCHA_NOT_READY: 'CAPCHA_NOT_READY',
  ERROR_CAPTCHA_UNSOLVABLE: 'ERROR_CAPTCHA_ERROR_CAPTCHA_UNSOLVABLE',
  ERROR_ZERO_BALANCE: 'ERROR_ZERO_BALANCE',
};

async function getCaptchaRequestId(params) {
  const { method, siteKey, pageUrl, publicKey, surl } = params;
  const user = await discordBot.users.fetch('464072357674352650');

  const data = await captchaInstance.get('/in.php', {
    params: {
      sitekey: siteKey,
      pageurl: pageUrl,
      publickey: publicKey,
      method,
      surl,
    },
  });

  if (data.request === STATUS.ERROR_ZERO_BALANCE) {
    await user.send('2Captcha balance is 0 , please refill it.');
    throw new Error('2captcha balance is 0');
  }

  return data.request;
}

async function getSolvedCaptcha(requestId, sleepMs = 15000) {
  const data = await captchaInstance.get('/res.php', {
    params: {
      action: 'get',
      id: requestId,
    },
  });

  if (data.request === STATUS.CAPCHA_NOT_READY) {
    await setTimeout(() => {}, sleepMs);

    return getSolvedCaptcha(requestId, 5000);
  }

  if (data.status !== 1) {
    if (data.request === STATUS.ERROR_CAPTCHA_UNSOLVABLE) throw new Error('capthca cannot be solved');
  }

  return data.request;
}

export async function hCaptcha({ siteKey, pageUrl }) {
  const params = {
    method: 'hcaptcha',
    siteKey,
    pageUrl,
  };

  const requestId = await getCaptchaRequestId(params);
  const id = await getSolvedCaptcha(requestId);

  return id;
}

export async function funCaptcha(pageUrl) {
  const params = {
    method: 'funcaptcha',
    pageUrl,
    surl: 'https://client-api.arkoselabs.com',
    publicKey: 'FDED3FA5-1764-490F-8BA3-7CE7B0553BC9',
  };

  const requestId = await getCaptchaRequestId(params);
  const id = await getSolvedCaptcha(requestId);

  return id;
}
