#!/usr/bin/env zx

try {
  const { stdout } = await $`curl http://localhost:3300/health `;
  console.log('🚀🚀 LOGGER : *****************************************************  🚀🚀`');
  console.log('response :', stdout);
  console.log('🚀🚀 ***************************************************** 🚀🚀');
} catch (error) {}
