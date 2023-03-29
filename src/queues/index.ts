
import SqsClient from '#apis/aws/sqs/index';

export const lambdaQueue = new SqsClient('lambda');
export const voteQueue = new SqsClient('vote');
