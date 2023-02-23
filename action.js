var core = require("@actions/core");
var cacheHttpClient = require("@actions/cache/lib/internal/cacheHttpClient");
var utils = require("@actions/cache/lib/internal/cacheUtils");

(async () => {
    try {
        const key = core.getInput("key");
        var keys = core.getMultilineInput("restore-keys") || [];
        keys.unshift(key);
        const path = core.getMultilineInput("path");
        const enableCrossOsArchive = core.getInput("enableCrossOsArchive").toLowerCase() === "true";
        const compressionMethod = await utils.getCompressionMethod();
        var cacheResponse = await cacheHttpClient.getCacheEntry(keys, path, { compressionMethod, enableCrossOsArchive });
        if(cacheResponse && cacheResponse.archiveLocation) {
            core.setOutput("cache-hit", (!!(
                cacheResponse.cacheKey &&
                cacheResponse.cacheKey.localeCompare(key, undefined, {
                    sensitivity: "accent"
                }) === 0
            )).toString());
            core.setOutput("cache-key", cacheResponse.cacheKey || "");
        }
    } catch {

    }
})();