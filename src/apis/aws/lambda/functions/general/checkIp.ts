//  @ts-expect-error
import { updateLambdaFunction } from 'utils';

export default async (): Promise<void> => {
  const res = await fetch('https://checkip.amazonaws.com/');
  const ip = await res.text();

  console.log(`Your IP address is ${ip}`);

  await updateLambdaFunction();
};
