import { handleRequest } from ".";

const Args = {
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || "",
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || "",
};

global.fetch = jest.fn() as jest.Mock;

jest.mock("../lib/upstash-redis", () => {
  const originalModule = jest.requireActual("../lib/upstash-redis");
  return {
    __esModule: true,
    ...originalModule,
    redisGet: jest.fn(() => Promise.resolve({ item: "value" }))
  };
});

describe("Upstash Redis", () => {
  it.todo("should return ...");
});
