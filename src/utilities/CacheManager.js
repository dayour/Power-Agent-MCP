"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalCache = exports.PowerPlatformCache = void 0;
var PowerPlatformCache = /** @class */ (function () {
    function PowerPlatformCache(config) {
        this.cache = new Map();
        this.cacheHits = 0;
        this.cacheMisses = 0;
        this.config = __assign({ solutionMetadataTTL: 5 * 60 * 1000, environmentInfoTTL: 10 * 60 * 1000, authTokenTTL: 3600 * 1000, configurationTTL: 30 * 60 * 1000, maxCacheSize: 100 * 1024 * 1024, enableCacheWarming: true }, config);
    }
    /**
     * Gets an item from the cache if it exists and hasn't expired
     * @param key Cache key
     * @returns Cached data or undefined if not found/expired
     */
    PowerPlatformCache.prototype.get = function (key) {
        var entry = this.cache.get(key);
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
        return entry.data;
    };
    /**
     * Sets an item in the cache with the specified TTL
     * @param key Cache key
     * @param data Data to cache
     * @param ttl Time to live in milliseconds (optional, uses default based on key pattern)
     */
    PowerPlatformCache.prototype.set = function (key, data, ttl) {
        var defaultTTL = this.getDefaultTTL(key);
        var expiry = Date.now() + (ttl || defaultTTL);
        this.cache.set(key, {
            data: data,
            expiry: expiry,
            key: key
        });
        // Cleanup expired entries and enforce size limits
        this.cleanup();
    };
    /**
     * Removes an item from the cache
     * @param key Cache key to remove
     */
    PowerPlatformCache.prototype.delete = function (key) {
        return this.cache.delete(key);
    };
    /**
     * Clears all cache entries
     */
    PowerPlatformCache.prototype.clear = function () {
        this.cache.clear();
        this.cacheHits = 0;
        this.cacheMisses = 0;
    };
    /**
     * Invalidates cache entries matching a pattern
     * @param pattern Pattern to match against cache keys
     */
    PowerPlatformCache.prototype.invalidatePattern = function (pattern) {
        var regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
        for (var _i = 0, _a = this.cache.keys(); _i < _a.length; _i++) {
            var key = _a[_i];
            if (regex.test(key)) {
                this.cache.delete(key);
            }
        }
    };
    /**
     * Gets cache statistics
     */
    PowerPlatformCache.prototype.getStats = function () {
        var total = this.cacheHits + this.cacheMisses;
        return {
            hits: this.cacheHits,
            misses: this.cacheMisses,
            hitRatio: total > 0 ? this.cacheHits / total : 0,
            size: this.cache.size
        };
    };
    /**
     * Gets cached solution information or fetches it if not cached
     * @param solutionName Solution name
     * @param environmentUrl Environment URL
     * @param fetcher Function to fetch the data if not cached
     */
    PowerPlatformCache.prototype.getSolutionInfo = function (solutionName, environmentUrl, fetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "solution:".concat(environmentUrl, ":").concat(solutionName);
                        cached = this.get(cacheKey);
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, fetcher()];
                    case 1:
                        data = _a.sent();
                        this.set(cacheKey, data, this.config.solutionMetadataTTL);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Gets cached environment information or fetches it if not cached
     * @param environmentUrl Environment URL
     * @param fetcher Function to fetch the data if not cached
     */
    PowerPlatformCache.prototype.getEnvironmentInfo = function (environmentUrl, fetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "environment:".concat(environmentUrl);
                        cached = this.get(cacheKey);
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, fetcher()];
                    case 1:
                        data = _a.sent();
                        this.set(cacheKey, data, this.config.environmentInfoTTL);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Gets cached authentication token or fetches it if not cached
     * @param tokenKey Unique token identifier
     * @param fetcher Function to fetch the token if not cached
     * @param customTTL Custom TTL for this token (optional)
     */
    PowerPlatformCache.prototype.getAuthToken = function (tokenKey, fetcher, customTTL) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "auth:".concat(tokenKey);
                        cached = this.get(cacheKey);
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, fetcher()];
                    case 1:
                        data = _a.sent();
                        this.set(cacheKey, data, customTTL || this.config.authTokenTTL);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Gets cached configuration data or fetches it if not cached
     * @param configKey Configuration key
     * @param fetcher Function to fetch the data if not cached
     */
    PowerPlatformCache.prototype.getConfiguration = function (configKey, fetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "config:".concat(configKey);
                        cached = this.get(cacheKey);
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, fetcher()];
                    case 1:
                        data = _a.sent();
                        this.set(cacheKey, data, this.config.configurationTTL);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    PowerPlatformCache.prototype.getDefaultTTL = function (key) {
        if (key.startsWith('solution:')) {
            return this.config.solutionMetadataTTL;
        }
        else if (key.startsWith('environment:')) {
            return this.config.environmentInfoTTL;
        }
        else if (key.startsWith('auth:')) {
            return this.config.authTokenTTL;
        }
        else if (key.startsWith('config:')) {
            return this.config.configurationTTL;
        }
        return this.config.solutionMetadataTTL; // Default fallback
    };
    PowerPlatformCache.prototype.cleanup = function () {
        var now = Date.now();
        // Remove expired entries
        for (var _i = 0, _a = this.cache.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], entry = _b[1];
            if (entry.expiry <= now) {
                this.cache.delete(key);
            }
        }
        // Enforce size limits using LRU eviction (simple approach)
        if (this.cache.size > 1000) { // Simple size limit by entry count
            var entries = Array.from(this.cache.entries());
            entries.sort(function (a, b) { return a[1].expiry - b[1].expiry; });
            // Remove oldest 25% of entries
            var toRemove = Math.floor(entries.length * 0.25);
            for (var i = 0; i < toRemove; i++) {
                this.cache.delete(entries[i][0]);
            }
        }
    };
    return PowerPlatformCache;
}());
exports.PowerPlatformCache = PowerPlatformCache;
// Global cache instance
exports.globalCache = new PowerPlatformCache();
