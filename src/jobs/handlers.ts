import { GTOP_GAMES } from '#utils/constants';
import { lambdaQueue, voteQueue } from '#queues/index';
import { convertToSingleQuotes, executeStatement } from '#apis/aws/dynamoDB/index';
import { type UserI } from '#types';

export const scrapeGtop100 = async (): Promise<void> => {
  try {
    await lambdaQueue.sendMessage({
      fnName: 'cleanTable',
      payload: 'GAMES',
    });
    await lambdaQueue.sendMessage({
      fnName: 'scrapeGtopServers',
      payload: GTOP_GAMES,
    });
  } catch (error) {

  }
};

export const resetDailyVotes = async (): Promise<void> => lambdaQueue.sendMessage({
  fnName: 'resetDailyVotes',
});

export const voteScheduler = async (): Promise<void> => {
  const users = await executeStatement('SELECT * FROM USERS');
  for (const { id, is_active } of users as UserI[]) {
    if (!is_active) continue;
    const votes = await executeStatement(`SELECT * FROM VOTES WHERE user_id = ${convertToSingleQuotes(id)}`);
    for (const vote of votes) {
      await voteQueue.sendMessage(vote);
    }
  }
};
