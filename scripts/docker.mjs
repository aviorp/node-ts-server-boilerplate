#!/usr/bin/env zx

console.log('Docker script started');
try {
  await $`docker login -u ${process.env.username} -p ${process.env.password}`;
  await $`docker build . -t ${process.env.image}`;
  await $`docker push ${process.env.image}`;
} catch (error) {
  console.error(error);
}

console.log('Docker script finished');
