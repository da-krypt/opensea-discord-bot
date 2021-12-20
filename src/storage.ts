import * as Redis from "ioredis";
const LAST_FETCH_REDIS_KEY = "last_fetch";

export const redisClient = new Redis(6379, process.env.REDIS_HOST || "redis");

export const setLastFetch = async (epochTimestamp: number) => {
  return redisClient.set(LAST_FETCH_REDIS_KEY, epochTimestamp);
};

export const getLastFetch = async () => {
  return redisClient.get(LAST_FETCH_REDIS_KEY);
};
