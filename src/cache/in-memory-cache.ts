type CacheEntry = {
    content: any;
    timestamp: number;
};

export const CACHE_TTL = 1000 * 60 * 5; // 5 minutes in milliseconds

export const inMemoryCache = new Map<string, CacheEntry>();
