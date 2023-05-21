/* eslint-disable @typescript-eslint/no-var-requires */

import FastGlob from 'fast-glob';

interface Route {
  path: string
  module: any
}
const routes: Route[] = [];

const files = FastGlob.sync('./*.ts', {
  cwd: __dirname,
  ignore: ['index.ts'],
});

for (const file of files) {
  const shortenedFile = file.replace('.ts', '');
  const module = require(`./${file}`).default;
  const path = shortenedFile === 'general' ? '/' : `/${shortenedFile}`;
  routes.push({ path, module });
}

export default routes;
