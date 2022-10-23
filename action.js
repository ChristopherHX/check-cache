var core = require("@actions/core");
var cacheHttpClient = require("@actions/cache/lib/internal/cacheHttpClient");
var utils = require("@actions/cache/lib/internal/cacheUtils");

(async () => {
    try {
        const key = core.getInput("key");
        const path = core.getInput("path");
        const compressionMethod = await utils.getCompressionMethod();
        var cacheResponse = await cacheHttpClient.getCacheEntry([key], [path], { compressionMethod });
        if(cacheResponse && cacheResponse.archiveLocation) {
            core.setOutput("cache-hit", "true");
        }
    } catch {

    }
})();