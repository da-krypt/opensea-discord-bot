import * as Redis from "ioredis";
const LAST_FETCH_REDIS_KEY = "last_fetch";
const IS_RUNNING_REDIS_KEY = "is_running";

export let redisClient = new Redis(6379, "redis");
if (process.env.REDIS_URI) {
  redisClient = new Redis(process.env.REDIS_URI);
}

export const setLastFetch = async (epochTimestamp: number) => {
  return redisClient.set(LAST_FETCH_REDIS_KEY, epochTimestamp);
};

export const getLastFetch = async () => {
  return redisClient.get(LAST_FETCH_REDIS_KEY);
};

export const setIsRunning = async () => {
  return redisClient.set(IS_RUNNING_REDIS_KEY, "yes");
};

export const setIsNotRunning = async () => {
  return redisClient.set(IS_RUNNING_REDIS_KEY, "no");
};

export const getIsRunning = async () => {
  return (await redisClient.get(IS_RUNNING_REDIS_KEY)) === "yes";
};
