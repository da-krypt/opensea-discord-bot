import * as Redis from "ioredis";

export const redisClient = new Redis(6379, process.env.REDIS_HOST || "redis");
