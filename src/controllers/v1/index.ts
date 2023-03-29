// /* eslint-disable @typescript-eslint/no-var-requires */

// import FastGlob from 'fast-glob';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// interface Route {
//   path: string
//   module: any
// }
// const V1Routes: Route[] = [];

// const files = FastGlob.sync('./**/index.ts', {
//   cwd: __dirname,
//   ignore: ['./index.ts'],
// });

// for (const file of files) {
//   const shortenedFile = file.replace('index.ts', '');
//   const module: any = await import(`./${shortenedFile}`).then(m => m.default);
//   const path = shortenedFile === 'common' ? '/' : `/${shortenedFile}`;
//   const path_v1 = `/api/v1${path}`;
//   V1Routes.push({ path: path_v1, module });
// }

// export default V1Routes;

import votes from './votes/index.js';
import games from './games/index.js';
import users from './users/index.js';
import paypal from './paypal/index.js';
import common from './common/index.js';

const generateUrl = (path: string): string => `/api/v1/${path}`;

export default [
  {
    path: generateUrl('votes'),
    module: votes,
  },
  {
    path: generateUrl('games'),
    module: games,
  },
  {
    path: generateUrl('users'),
    module: users,
  },
  {
    path: generateUrl('paypal'),
    module: paypal,
  },

  {
    path: generateUrl(''),
    module: common,
  },
];
