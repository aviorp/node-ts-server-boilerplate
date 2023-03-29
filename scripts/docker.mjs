#!/usr/bin/env zx

console.log('Docker script started');
try {
  await $`docker login -u ${process.env.USERNAME} -p ${process.env.PASSWORD}`;
  await $`docker build . -t ${process.env.IMAGE}`;
  await $`docker push ${process.env.IMAGE}`;
} catch (error) {
  console.error(error);
}

console.log('Docker script finished');
