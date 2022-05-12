"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processParams = exports.parseMultipart = exports.bodyParser = void 0;
const tslib_1 = require("tslib");
// bodyparser main
const handle_upload_1 = require("./handle-upload");
// @NOTE 2022-05-02 although the module has updated but it still not working correctly!
const parse_multipart_1 = require("./parse-multipart");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
// debug
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:body-parser:main');
// processing
// main
function bodyParser(res, req, onAborted) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // when accessing the req / res before calling the end, we need to explicitly attach the onAborted handler
        res.onAborted(() => {
            onAborted ? Reflect.apply(onAborted, null, [res]) : debugFn('ABORTED');
        });
        // process the header
        const headers = (0, utils_1.getHeaders)(req);
        const url = req.getUrl();
        const query = req.getQuery();
        const params = (0, utils_1.parseQuery)(query);
        const method = req.getMethod();
        // we now always parse the URL because the url could be soemthing like /something/*/_id whatever
        // and we need to extract the params from the url and pass back as the ctx object
        // package it up
        const body = { url, method, query, headers, params };
        // we should only call this when the header is not GET?
        return new Promise(resolver => {
            (0, handle_upload_1.onDataHandler)(res, buffer => {
                body.payload = buffer;
                switch (true) {
                    case (0, utils_1.isJson)(headers):
                        body.type = constants_1.IS_JSON;
                        body.params = handleJsonRequestParams(buffer, params);
                        break;
                    case (0, utils_1.isForm)(headers):
                        body.type = constants_1.IS_FORM;
                        body.params = (0, utils_1.parseQuery)(buffer.toString());
                        break;
                    case (0, utils_1.isFile)(headers):
                        body.type = constants_1.IS_MULTI;
                        body.params = parseMultipart(headers, buffer);
                        break;
                    default:
                        body.type = constants_1.IS_OTHER;
                }
                resolver(body);
            });
        });
    });
}
exports.bodyParser = bodyParser;
/**
 we could get some strange result here
 when we set a json header with a GET
 */
function handleJsonRequestParams(buffer, params) {
    const payload = buffer.toString();
    // @TODO this could still be problematic in some edge case, waiting for that to happen
    return payload ? JSON.parse(payload) : ((0, utils_1.isEmptyObj)(params) ? {} : params);
}
// all-in-one to parse and post process the multipart-formdata input
function parseMultipart(headers, body) {
    const boundary = (0, parse_multipart_1.getBoundary)(headers[constants_1.CONTENT_TYPE]);
    if (boundary) {
        const params = (0, parse_multipart_1.parse)(body, boundary);
        if (Array.isArray(params) && params.length) {
            return processParams(params);
        }
    }
    return {};
}
exports.parseMultipart = parseMultipart;
// break it out from above for clearity
function processFileArray(params) {
    return params.filter(param => param.filename && param.type)
        .map(param => {
        const { name, type, filename, data } = param;
        const [strName, arr] = (0, utils_1.takeApartName)(name);
        const content = { type, filename, data };
        const value = arr ? [content] : content;
        return { name: strName, value };
    })
        // from https://stackoverflow.com/questions/57379778/typescript-type-for-reduce
        // @TODO the output type still problematic
        .reduce((a, b) => {
        switch (true) {
            case ((0, utils_1.isEmptyObj)(a)):
                return { [b.name]: b.value }; // init
            case (a[b.name] !== undefined):
                return Object.assign(a, {
                    [b.name]: (0, utils_1.toArr)(a[b.name]).concat((0, utils_1.toArr)(b.value))
                });
            default:
                return Object.assign(a, { [b.name]: b.value });
        }
    }, {});
}
// when the result is simple text then we parse it to string not buffer
function processTextArray(params) {
    return params
        .filter(param => !param.filename && !param.type)
        .map((param) => (
    // @TODO how to use the type info to return as number or other data type
    { [param.name]: (0, utils_1.toBuffer)(param.data).toString() }))
        .reduce((a, b) => Object.assign(a, b), {});
}
// export this for unit test
function processParams(params) {
    return Object.assign(processFileArray(params), processTextArray(params));
}
exports.processParams = processParams;
