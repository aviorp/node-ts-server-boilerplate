#!/usr/bin/env zx

import { getRootPath } from './utils.mjs';

try {
  const root = await getRootPath();
  await $`docker-compose -f ${root}/deployment/stage.yaml up -d`;
} catch (error) {
  console.error(error);
}
