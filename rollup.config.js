import { resolve } from 'path';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
export default {
  input: 'src/app.ts', // Update the entry point accordingly
  output: {
    file: 'dist/app.js', // Update the output path and filename as needed
    format: 'cjs',
  },
  external: [
    'dotenv/config',
    'body-parser',
    'express',
    'morgan',
    'swagger-ui-express',
    '@prisma/client',
    'fast-glob',
  ],
  plugins: [
    typescript(),
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    }),
    terser(), // minifies generated bundles,
  ],
};
