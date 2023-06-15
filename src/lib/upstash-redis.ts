import { Redis, RedisConfigNodejs } from "@upstash/redis/nodejs";
import { Ratelimit } from "@upstash/ratelimit";

type Unit = "ms" | "s" | "m" | "h" | "d";
export type LimitDuration = `${number} ${Unit}` | `${number}${Unit}`;

export type LimitConfig = {
  identifier: string;
  limit: number;
  window: LimitDuration;
  cache: Map<string, number>;
};


export interface RedisConfig extends RedisConfigNodejs {}

export interface ResultProps {
  result?: string;
  status?: number;
}

export async function redisRateLimit(limitConfig: LimitConfig, config: RedisConfigNodejs): Promise<ResultProps> {
  try {
    const redis = new Redis(config);

    const limit = limitConfig?.limit || 3;
    const window = limitConfig?.window || "30 s";
    const identifier = limitConfig?.identifier || "user unique id";

    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.cachedFixedWindow(limit, window),
      ephemeralCache: limitConfig?.cache,
    });

    const { success } = await ratelimit.limit(identifier);
    if (!success) {
      return { result: "Too Many Requests", status: 429 };
    }
    return { result: `success request ${identifier} window: ${window} - router /login`, status: 200 };
  } catch (error: any) {
    console.log(JSON.stringify(error));
    return { result: `${error?.message} fail rate limit`, status: 500 };
  }
}