"use strict";
// server static methods
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const constants_1 = require("./base/constants");
const writers_1 = require("./writers");
const mime_1 = require("./base/mime");
// import { toArray } from '@jsonql/utils'
// import { toArr } from '@velocejs/bodyparser/utils'
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:server:serve-static');
/**
 * serve static files from assetDir
 */
function serveStatic(assetDir) {
    const dirs = Array.isArray(assetDir) ? assetDir : [assetDir];
    return function (res, req) {
        // we need to provide a onAbortedHandler here
        res.onAborted(() => {
            debugFn(`Serve static aborted`);
        });
        let url = req.getUrl();
        if (url === '/') {
            url = constants_1.DEFAULT_FILE;
        }
        debugFn(url);
        const file = dirs
            .filter((dir) => node_fs_1.default.existsSync(node_path_1.default.join(dir, url)))
            .map((dir) => node_fs_1.default.readFileSync(node_path_1.default.join(dir, url)));
        if (file.length) {
            const mimeType = (0, mime_1.lookup)(url);
            const writer = (0, writers_1.getWriter)(res);
            writer(file[0], { [constants_1.CONTENT_TYPE]: mimeType });
        }
        else {
            (0, writers_1.write404)(res);
        }
    };
}
exports.serveStatic = serveStatic;
