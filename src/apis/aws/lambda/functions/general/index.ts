import * as fns from './fns.js';
export const handler = async (event: any) => {
  const xEvent = event?.Records?.[0]?.body ? JSON.parse(event.Records[0].body) : event;
  if (!xEvent.fnName) {
    throw new Error('Event function not provided');
  }
  const fn = fns[xEvent.fnName];
  return fn(xEvent.payload);
};
