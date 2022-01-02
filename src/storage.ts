import * as Redis from "ioredis";
const LAST_FETCH_REDIS_KEY = "last_fetch";
const IS_RUNNING_REDIS_KEY = "is_running";

console.log("REDIS_URI", process.env.REDIS_URI);
export let redisClient = process.env.REDIS_URI
  ? new Redis(process.env.REDIS_URI)
  : new Redis(6379, "localhost");

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
