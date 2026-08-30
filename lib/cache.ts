import { Redis } from "@upstash/redis";

/**
 * Official Upstash Redis Client Configuration
 * Supports UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or Vercel KV env vars).
 */

const upstashUrl =
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL;

const upstashToken =
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_TOKEN;

export const redis: Redis | null =
  upstashUrl && upstashToken
    ? new Redis({
        url: upstashUrl,
        token: upstashToken,
      })
    : null;

// High-speed in-memory store fallback
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const memoryStore = new Map<string, CacheEntry<any>>();
const MAX_MEMORY_ENTRIES = 1000;

function cleanupMemoryStore() {
  const now = Date.now();
  for (const [key, entry] of memoryStore.entries()) {
    if (entry.expiresAt <= now) {
      memoryStore.delete(key);
    }
  }
  if (memoryStore.size > MAX_MEMORY_ENTRIES) {
    const keysToDelete = Array.from(memoryStore.keys()).slice(0, 100);
    keysToDelete.forEach((k) => memoryStore.delete(k));
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(cleanupMemoryStore, 60000).unref?.();
}

/**
 * Get an item from Upstash Redis (or In-Memory fallback)
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  // 1. Try Upstash Redis
  if (redis) {
    try {
      const result = await redis.get<T>(key);
      if (result !== null && result !== undefined) {
        return result;
      }
    } catch (err) {
      console.warn("Upstash Redis get error:", err);
    }
  }

  // 2. In-Memory fallback
  const entry = memoryStore.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    memoryStore.delete(key);
    return null;
  }

  return entry.value as T;
}

/**
 * Set an item in Upstash Redis and In-Memory fallback with TTL in seconds
 */
export async function cacheSet<T>(key: string, value: T, ttlSeconds: number = 60): Promise<void> {
  const expiresAt = Date.now() + ttlSeconds * 1000;

  // 1. Save in memory store
  memoryStore.set(key, { value, expiresAt });
  if (memoryStore.size > MAX_MEMORY_ENTRIES) {
    cleanupMemoryStore();
  }

  // 2. Save to Upstash Redis with expiration
  if (redis) {
    try {
      await redis.set(key, value, { ex: ttlSeconds });
    } catch (err) {
      console.warn("Upstash Redis set error:", err);
    }
  }
}

/**
 * Wrap any asynchronous fetcher with automatic Upstash Redis caching
 */
export async function cached<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cachedVal = await cacheGet<T>(key);
  if (cachedVal !== null && cachedVal !== undefined) {
    return cachedVal;
  }

  const fresh = await fetcher();
  if (fresh !== undefined) {
    await cacheSet(key, fresh, ttlSeconds);
  }
  return fresh;
}

/**
 * Invalidate cache key or pattern in Upstash Redis
 */
export async function invalidateCache(keyOrPattern: string): Promise<void> {
  // Clear from in-memory fallback
  for (const key of Array.from(memoryStore.keys())) {
    if (key === keyOrPattern || key.startsWith(keyOrPattern)) {
      memoryStore.delete(key);
    }
  }

  // Clear from Upstash Redis
  if (redis) {
    try {
      if (keyOrPattern.includes("*")) {
        const keys = await redis.keys(keyOrPattern);
        if (keys.length > 0) {
          await redis.del(...keys);
        }
      } else {
        await redis.del(keyOrPattern);
      }
    } catch (err) {
      console.warn("Upstash Redis del error:", err);
    }
  }
}
