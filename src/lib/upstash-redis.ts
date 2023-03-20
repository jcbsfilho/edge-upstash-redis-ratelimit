import { Redis, RedisConfigNodejs } from "@upstash/redis/nodejs";
import { Ratelimit } from "@upstash/ratelimit";
import { randomUUID } from "node:crypto"

const cache = new Map();

type Unit = "ms" | "s" | "m" | "h" | "d";
export type LimitDuration = `${number} ${Unit}` | `${number}${Unit}`;

export type LimitConfig = {
  identifier: string
  limit: number
  window: LimitDuration
}

export interface MethodRouterRedis {
  [x:string]: (limitConfig:LimitConfig, config: RedisConfigNodejs) => Promise<ResultProps>;
}

export interface RedisConfig extends RedisConfigNodejs {}

export interface ResultProps {
  result?: string;
  status?: number;
}

export async function redisRateLimit(limitConfig:LimitConfig, config: RedisConfigNodejs): Promise<ResultProps> {
  try {
    const redis = new Redis(config);

    const limit = limitConfig?.limit || 10
    const window = limitConfig?.window || "10 s"
    const identifier = limitConfig?.identifier || randomUUID()

    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.cachedFixedWindow(limit, window),
      ephemeralCache: cache,
    });

    const result = await ratelimit.limit(identifier);
    if (!result) {
      return { result: "Too Many Requests", status: 429 };
    }
    return { result: "success", status: 200 };
  } catch (error:any) {
    return { result: error?.message || 'fail get item', status: 500 };
  }
}
