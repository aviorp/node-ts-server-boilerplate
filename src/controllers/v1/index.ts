/* eslint-disable @typescript-eslint/no-var-requires */

import FastGlob from 'fast-glob';

interface Route {
  path: string
  module: any
}
const V1Routes: Route[] = [];

const files = FastGlob.sync('./**/index.ts', {
  cwd: __dirname,
  ignore: ['./index.ts'],
});

for (const file of files) {
  const shortenedFile = file.replace('index.ts', '');
  const module = require(`./${file}`).default;
  const path = shortenedFile === 'common' ? '/' : `/${shortenedFile}`;
  const path_v1 = `/api/v1${path}`;
  V1Routes.push({ path: path_v1, module });
}

export default V1Routes;
