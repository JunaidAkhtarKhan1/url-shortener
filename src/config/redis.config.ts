import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

let redisAvailable = false;
let redisErrorLogged = false;

redis.on("connect", () => {
  redisAvailable = true;
  redisErrorLogged = false;
  console.log("Redis connected");
});

redis.on("ready", () => {
  redisAvailable = true;
});

redis.on("error", (err: Error) => {
  redisAvailable = false;

  // Log ONLY once until Redis recovers
  if (!redisErrorLogged) {
    redisErrorLogged = true;
    console.error("Redis unavailable, running without cache", err.message);
  }
});

(async () => {
  try {
    await redis.connect();
  } catch (err: any) {
    redisAvailable = false;

    if (!redisErrorLogged) {
      redisErrorLogged = true;
      console.error(
        "Redis connection failed at startup, continuing without cache",
      );
    }
  }
})();

export { redis, redisAvailable };
