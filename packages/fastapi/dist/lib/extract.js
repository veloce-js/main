"use strict";
// dumb way to make send of the method that the decorator apply
// The problem is when you apply the decorator, it's at design time (TS)
// but it actually run on the run time (JS) so you don't really got any type info
// try the ts-morph facing the same situation. So we need to find away to
// parse the file at TS stage to extract the Type info for Validation
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareArgs = exports.extractArgs = void 0;
// ugly but simple and it works
function extractArgs(fnStr) {
    return splitMethod(fnStr);
}
exports.extractArgs = extractArgs;
// 0.103 -- this is 50% faster then regex!
function splitMethod(fnStr) {
    return fnStr.split('(')[1]
        .split(')')[0]
        .split(',')
        .map(t => t.trim())
        .filter(t => t !== '');
}
/** The validate result now comes in an object, we need to turn into array for apply */
function prepareArgs(argList, result) {
    return argList.map(name => result[name]);
}
exports.prepareArgs = prepareArgs;
