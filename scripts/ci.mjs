#!/usr/bin/env zx

console.log("CI script started");
const requiredEnvVars = ["username", "password", "image"];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(
      `Missing required environment variable: ${envVar} (notice that environment variables are case-sensitive and consume also inside repo's secrets)`
    );
  }
});
console.log("All required environment variables are defined");

console.log("CI script finished");
