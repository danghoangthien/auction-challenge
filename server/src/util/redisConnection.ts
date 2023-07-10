import { createClient } from "redis";
import { promisify } from "util";
import logger from "../util/logger";

export const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10),
  disable_resubscribing: false,
});

redisClient.on("connect", () => {
  if (process.env.NODE_ENV !== "test") {
    logger.info("Redis client connected");
  }
});

redisClient.on("error", error => {
  logger.error(`Unhandled Exception: ${error}.`);
});

export const get = promisify(redisClient.get).bind(redisClient);
export const set = promisify(redisClient.set).bind(redisClient);
export const hget = promisify(redisClient.hget).bind(redisClient);
export const hset = promisify(redisClient.hset).bind(redisClient);
export const setnx = promisify(redisClient.setnx).bind(redisClient);
export const expire = promisify(redisClient.expire).bind(redisClient);
export const del = promisify(redisClient.del).bind(redisClient);
export const incr = promisify(redisClient.incr).bind(redisClient);
