import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { OPTIONS } from '../constants';

interface TLambdaFunctionName {
  TEST: 'test'
  scrapeGtopServers: 'scrapeGtopServers'
}

class Lambda extends LambdaClient {
  // invoke function with type of fnName and parameters of payload
  async invoke<T extends keyof TLambdaFunctionName>(fnName: T, payload: any): Promise<any> {
    const payloadWithFnName = {
      payload,
      fnName,
    };
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(JSON.stringify(payloadWithFnName));
    const command = new InvokeCommand({
      FunctionName: 'Placeholder',
      Payload: uint8Array,
    });
    const response = await this.send(command);
    const decoder = new TextDecoder('utf-8');
    const jsonString = decoder.decode(response.Payload);
    const data = JSON.parse(jsonString);
    if (data.errorMessage) throw new Error(data.errorMessage);

    return data;
  }
}

export default new Lambda(OPTIONS);
