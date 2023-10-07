// Custom middleware

import { CACHE_TTL, inMemoryCache } from "./cache/in-memory-cache";

// returns cache if it gets a hit
export const cacheMiddleware = async (c: any, next: any) => {
    const cacheKey = c.req.url;
    const cacheEntry = inMemoryCache.get(cacheKey);

    if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_TTL) {
        return c.jsonT(cacheEntry.content);
    }

    await next();
};
