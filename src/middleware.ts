// Custom middleware
import { CACHE_TTL, inMemoryCache } from "./cache/in-memory-cache";

// Utility function to determine if a string looks like a datetime
const isDatetimeString = (str: string): boolean => {
    // This is a basic check using regex, you may need to adjust based on your datetime format.
    const datetimePattern =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
    return datetimePattern.test(str);
};

export const getCacheKeyFromUrl = (url: URL): string => {
    const originalUrl = url;

    Array.from(originalUrl.searchParams.entries()).forEach(([key, value]) => {
        if (isDatetimeString(value)) {
            originalUrl.searchParams.delete(key);
        }
    });

    // Construct cache key without datetime query params
    const cacheUrl = originalUrl.pathname + originalUrl.search;

    return cacheUrl;
};

// returns cache if it gets a hit
export const cacheMiddleware = async (c: any, next: any) => {
    const url = new URL(c.req.url);

    const cacheUrl = getCacheKeyFromUrl(url);

    const cacheEntry = inMemoryCache.get(cacheUrl);

    if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_TTL) {
        return c.jsonT(cacheEntry.content);
    }

    await next();
};
