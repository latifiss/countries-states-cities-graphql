import { createHash } from 'node:crypto';

const DEFAULT_TIMEOUT_MS = 1200;
let warned = false;

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return null;
    return { url: url.replace(/\/+$/, ''), token };
  } catch {
    return null;
  }
}

function warnOnce(message, error) {
  if (warned) return;
  warned = true;
  console.warn(`[cache] ${message}; continuing without cache.`, error?.message ?? '');
}

async function redisCommand(config, command) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Upstash returned HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (payload?.error) throw new Error(String(payload.error));
    return payload?.result;
  } finally {
    clearTimeout(timeout);
  }
}

export async function withCache(namespace, args, ttlSeconds, loader) {
  const config = getRedisConfig();
  if (!config) return loader();

  const digest = createHash('sha256')
    .update(JSON.stringify(args ?? {}))
    .digest('hex');
  const key = `countriesql:v1:${namespace}:${digest}`;

  try {
    const cached = await redisCommand(config, ['GET', key]);
    if (typeof cached === 'string') {
      try {
        return JSON.parse(cached);
      } catch (error) {
        warnOnce('Invalid cached JSON', error);
      }
    }
  } catch (error) {
    warnOnce('Redis read failed', error);
  }

  // MongoDB remains the source of truth. A cache write failure must not
  // change a successful database response into a failed GraphQL request.
  const value = await loader();

  try {
    if (value !== undefined) {
      await redisCommand(config, ['SET', key, JSON.stringify(value), 'EX', ttlSeconds]);
    }
  } catch (error) {
    warnOnce('Redis write failed', error);
  }

  return value;
}
