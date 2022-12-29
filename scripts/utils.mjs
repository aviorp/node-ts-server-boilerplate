#!/usr/bin/env zx

export const getRootPath = async () => {
  const { stdout } = await $`pwd`;
  return stdout.trim();
};
