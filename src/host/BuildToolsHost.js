"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildToolsHost = void 0;
var fs = require("fs-extra");
var path = require("path");
var os = require("os");
var unzip = require("unzip-stream");
var tl = require("azure-pipelines-task-lib/task");
var getEnvironmentUrl_1 = require("../params/auth/getEnvironmentUrl");
var logger_1 = require("../host/logger");
var BuildToolsHost = /** @class */ (function () {
    function BuildToolsHost(artifactStoreName) {
        this.name = "Build-Tools";
        this._artifactStoreName = artifactStoreName || 'artifacts';
    }
    BuildToolsHost.prototype.getInput = function (entry) {
        if (entry.name === 'Environment')
            return (0, getEnvironmentUrl_1.getEnvironmentUrl)();
        var value = tl.getInput(entry.name, entry.required);
        // normalize value to always be undefined if the user has not declared the input value
        return (value && value.trim() !== '') ? value : undefined;
    };
    BuildToolsHost.prototype.getArtifactStore = function () {
        return new AzDevOpsArtifactStore(this._artifactStoreName);
    };
    return BuildToolsHost;
}());
exports.BuildToolsHost = BuildToolsHost;
var AzDevOpsArtifactStore = /** @class */ (function () {
    function AzDevOpsArtifactStore(subFolder) {
        this._hasArtifactFolder = false;
        this._subFolder = subFolder;
        this._resultsDirectory = os.tmpdir();
    }
    AzDevOpsArtifactStore.prototype.getTempFolder = function () {
        var outputDirectory = this.getOutputDirectory();
        this._resultsDirectory = path.join(outputDirectory, 'results');
        logger_1.default.debug("Artifact directory: ".concat(outputDirectory));
        return outputDirectory;
    };
    AzDevOpsArtifactStore.prototype.upload = function (artifactName, files) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, files_1, file, resultFiles, _a, resultFiles_1, resultFiles_1_1, resultFile, fqn, e_1_1;
            var _b, e_1, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger_1.default.debug("files: ".concat(files.join(';')));
                        return [4 /*yield*/, fs.emptyDir(this._resultsDirectory)];
                    case 1:
                        _e.sent();
                        _i = 0, files_1 = files;
                        _e.label = 2;
                    case 2:
                        if (!(_i < files_1.length)) return [3 /*break*/, 7];
                        file = files_1[_i];
                        if (!(path.extname(file).toLowerCase() === '.zip')) return [3 /*break*/, 4];
                        logger_1.default.debug("unzipping ".concat(file, " into ").concat(this._resultsDirectory, " ..."));
                        return [4 /*yield*/, extractToFolder(file, this._resultsDirectory)];
                    case 3:
                        _e.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        logger_1.default.debug("copying ".concat(file, " into ").concat(this._resultsDirectory, " ..."));
                        return [4 /*yield*/, fs.copyFile(file, path.join(this._resultsDirectory, path.basename(file)))];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7:
                        if (!this._hasArtifactFolder) return [3 /*break*/, 8];
                        // https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/logging-commands?view=azure-devops&tabs=bash#upload-upload-an-artifact
                        tl.uploadArtifact(this._subFolder, this._resultsDirectory, artifactName);
                        return [3 /*break*/, 21];
                    case 8: return [4 /*yield*/, fs.readdir(this._resultsDirectory)];
                    case 9:
                        resultFiles = _e.sent();
                        _e.label = 10;
                    case 10:
                        _e.trys.push([10, 15, 16, 21]);
                        _a = true, resultFiles_1 = __asyncValues(resultFiles);
                        _e.label = 11;
                    case 11: return [4 /*yield*/, resultFiles_1.next()];
                    case 12:
                        if (!(resultFiles_1_1 = _e.sent(), _b = resultFiles_1_1.done, !_b)) return [3 /*break*/, 14];
                        _d = resultFiles_1_1.value;
                        _a = false;
                        resultFile = _d;
                        fqn = path.join(this._resultsDirectory, resultFile);
                        tl.uploadFile(fqn);
                        _e.label = 13;
                    case 13:
                        _a = true;
                        return [3 /*break*/, 11];
                    case 14: return [3 /*break*/, 21];
                    case 15:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 21];
                    case 16:
                        _e.trys.push([16, , 19, 20]);
                        if (!(!_a && !_b && (_c = resultFiles_1.return))) return [3 /*break*/, 18];
                        return [4 /*yield*/, _c.call(resultFiles_1)];
                    case 17:
                        _e.sent();
                        _e.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 20: return [7 /*endfinally*/];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    // Establish output directory for the different pipeline runtime contexts:
    // different variables are predefined depending on type of pipeline (build vs. release) and classic vs. yaml
    // https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml#agent-variables
    AzDevOpsArtifactStore.prototype.getOutputDirectory = function () {
        this._hasArtifactFolder = false;
        var baseOutDir;
        if (process.env.BUILD_ARTIFACTSTAGINGDIRECTORY) {
            baseOutDir = process.env.BUILD_ARTIFACTSTAGINGDIRECTORY;
            this._hasArtifactFolder = true;
        }
        else if (process.env.PIPELINE_WORKSPACE) {
            baseOutDir = process.env.PIPELINE_WORKSPACE;
        }
        else if (process.env.AGENT_BUILDDIRECTORY) {
            baseOutDir = process.env.AGENT_BUILDDIRECTORY;
        }
        else {
            baseOutDir = path.join(process.cwd(), 'out');
        }
        var outputDirectory = path.join(baseOutDir, this._subFolder);
        fs.emptyDirSync(outputDirectory);
        return outputDirectory;
    };
    return AzDevOpsArtifactStore;
}());
function extractToFolder(zipFile, outDirectory) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs.createReadStream(zipFile)
                        .pipe(unzip.Extract({ path: outDirectory }))
                        .on("close", function () {
                        resolve(outDirectory);
                    })
                        .on("error", function (error) {
                        reject(error);
                    });
                })];
        });
    });
}
