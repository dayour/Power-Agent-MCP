// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface CacheEntry<T = any> {
  data: T;
  expiry: number;
  key: string;
}

export interface CacheConfig {
  solutionMetadataTTL: number;      // Default: 5 minutes
  environmentInfoTTL: number;       // Default: 10 minutes
  authTokenTTL: number;             // Default: token lifetime
  configurationTTL: number;         // Default: 30 minutes
  maxCacheSize: number;             // Default: 100 MB
  enableCacheWarming: boolean;      // Default: true
}

export class PowerPlatformCache {
  private cache = new Map<string, CacheEntry>();
  private config: CacheConfig;
  private cacheHits = 0;
  private cacheMisses = 0;

  constructor(config?: Partial<CacheConfig>) {
    this.config = {
      solutionMetadataTTL: 5 * 60 * 1000,      // 5 minutes
      environmentInfoTTL: 10 * 60 * 1000,      // 10 minutes
      authTokenTTL: 3600 * 1000,               // 1 hour (fallback)
      configurationTTL: 30 * 60 * 1000,        // 30 minutes
      maxCacheSize: 100 * 1024 * 1024,         // 100 MB
      enableCacheWarming: true,
      ...config
    };
  }

  /**
   * Gets an item from the cache if it exists and hasn't expired
   * @param key Cache key
   * @returns Cached data or undefined if not found/expired
   */
  public get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.cacheMisses++;
      return undefined;
    }

    if (entry.expiry <= Date.now()) {
      this.cache.delete(key);
      this.cacheMisses++;
      return undefined;
    }

    this.cacheHits++;
    return entry.data as T;
  }

  /**
   * Sets an item in the cache with the specified TTL
   * @param key Cache key
   * @param data Data to cache
   * @param ttl Time to live in milliseconds (optional, uses default based on key pattern)
   */
  public set<T>(key: string, data: T, ttl?: number): void {
    const defaultTTL = this.getDefaultTTL(key);
    const expiry = Date.now() + (ttl || defaultTTL);

    this.cache.set(key, {
      data,
      expiry,
      key
    });

    // Cleanup expired entries and enforce size limits
    this.cleanup();
  }

  /**
   * Removes an item from the cache
   * @param key Cache key to remove
   */
  public delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clears all cache entries
   */
  public clear(): void {
    this.cache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }

  /**
   * Invalidates cache entries matching a pattern
   * @param pattern Pattern to match against cache keys
   */
  public invalidatePattern(pattern: string | RegExp): void {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Gets cache statistics
   */
  public getStats(): { hits: number; misses: number; hitRatio: number; size: number } {
    const total = this.cacheHits + this.cacheMisses;
    return {
      hits: this.cacheHits,
      misses: this.cacheMisses,
      hitRatio: total > 0 ? this.cacheHits / total : 0,
      size: this.cache.size
    };
  }

  /**
   * Gets cached solution information or fetches it if not cached
   * @param solutionName Solution name
   * @param environmentUrl Environment URL
   * @param fetcher Function to fetch the data if not cached
   */
  public async getSolutionInfo<T>(
    solutionName: string,
    environmentUrl: string,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const cacheKey = `solution:${environmentUrl}:${solutionName}`;
    
    let cached = this.get<T>(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await fetcher();
    this.set(cacheKey, data, this.config.solutionMetadataTTL);
    return data;
  }

  /**
   * Gets cached environment information or fetches it if not cached
   * @param environmentUrl Environment URL
   * @param fetcher Function to fetch the data if not cached
   */
  public async getEnvironmentInfo<T>(
    environmentUrl: string,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const cacheKey = `environment:${environmentUrl}`;
    
    let cached = this.get<T>(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await fetcher();
    this.set(cacheKey, data, this.config.environmentInfoTTL);
    return data;
  }

  /**
   * Gets cached authentication token or fetches it if not cached
   * @param tokenKey Unique token identifier
   * @param fetcher Function to fetch the token if not cached
   * @param customTTL Custom TTL for this token (optional)
   */
  public async getAuthToken<T>(
    tokenKey: string,
    fetcher: () => Promise<T>,
    customTTL?: number
  ): Promise<T> {
    const cacheKey = `auth:${tokenKey}`;
    
    let cached = this.get<T>(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await fetcher();
    this.set(cacheKey, data, customTTL || this.config.authTokenTTL);
    return data;
  }

  /**
   * Gets cached configuration data or fetches it if not cached
   * @param configKey Configuration key
   * @param fetcher Function to fetch the data if not cached
   */
  public async getConfiguration<T>(
    configKey: string,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const cacheKey = `config:${configKey}`;
    
    let cached = this.get<T>(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await fetcher();
    this.set(cacheKey, data, this.config.configurationTTL);
    return data;
  }

  private getDefaultTTL(key: string): number {
    if (key.startsWith('solution:')) {
      return this.config.solutionMetadataTTL;
    } else if (key.startsWith('environment:')) {
      return this.config.environmentInfoTTL;
    } else if (key.startsWith('auth:')) {
      return this.config.authTokenTTL;
    } else if (key.startsWith('config:')) {
      return this.config.configurationTTL;
    }
    
    return this.config.solutionMetadataTTL; // Default fallback
  }

  private cleanup(): void {
    const now = Date.now();
    
    // Remove expired entries
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiry <= now) {
        this.cache.delete(key);
      }
    }

    // Enforce size limits using LRU eviction (simple approach)
    if (this.cache.size > 1000) { // Simple size limit by entry count
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].expiry - b[1].expiry);
      
      // Remove oldest 25% of entries
      const toRemove = Math.floor(entries.length * 0.25);
      for (let i = 0; i < toRemove; i++) {
        this.cache.delete(entries[i][0]);
      }
    }
  }
}

// Global cache instance
export const globalCache = new PowerPlatformCache();