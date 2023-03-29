import { schedule } from 'node-cron';
import { consola } from 'consola';

import { voteScheduler, resetDailyVotes } from './handlers.js';

const jobs = [
  {
    name: 'Reset Daily Votes',
    timing: '0 0 * * *',
    handler: async () => resetDailyVotes(),
  },
  {
    name: 'Vote Scheduler',
    timing: '0 * * * *',
    handler: async () => voteScheduler(),
  },

];

export default async (): Promise<void> => {
  jobs.forEach(async ({ timing, handler, name }) => {
    consola.success(`Scheduling job: ${name}`);
    schedule(timing, handler);
  });
};
