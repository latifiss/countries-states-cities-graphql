import test from 'node:test';
import assert from 'node:assert/strict';
import { withCache } from '../lib/cache.js';

const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const originalFetch = globalThis.fetch;

function restoreEnvironment() {
  if (originalUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
  else process.env.UPSTASH_REDIS_REST_URL = originalUrl;
  if (originalToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
  else process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
  globalThis.fetch = originalFetch;
}

test('runs the loader normally when Upstash is not configured', async () => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  let calls = 0;

  try {
    const result = await withCache('test', {}, 60, async () => {
      calls += 1;
      return { healthy: true };
    });
    assert.deepEqual(result, { healthy: true });
    assert.equal(calls, 1);
  } finally {
    restoreEnvironment();
  }
});

test('returns cached JSON without calling the loader', async () => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
  globalThis.fetch = async () => new Response(
    JSON.stringify({ result: JSON.stringify({ cached: true }) }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );

  try {
    const result = await withCache('test', { id: 1 }, 60, async () => {
      throw new Error('Loader should not run on a cache hit');
    });
    assert.deepEqual(result, { cached: true });
  } finally {
    restoreEnvironment();
  }
});

test('falls back to the loader when Redis read fails and ignores write failure', async () => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
  let requests = 0;
  globalThis.fetch = async () => {
    requests += 1;
    return new Response('Redis unavailable', { status: 503 });
  };

  try {
    const result = await withCache('test', { id: 2 }, 60, async () => ({
      fromDatabase: true,
    }));
    assert.deepEqual(result, { fromDatabase: true });
    assert.equal(requests, 2);
  } finally {
    restoreEnvironment();
  }
});

test('does not cache or swallow database errors', async () => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
  globalThis.fetch = async () => new Response(
    JSON.stringify({ result: null }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );

  try {
    await assert.rejects(
      withCache('test', { id: 3 }, 60, async () => {
        throw new Error('MongoDB failed');
      }),
      /MongoDB failed/,
    );
  } finally {
    restoreEnvironment();
  }
});
