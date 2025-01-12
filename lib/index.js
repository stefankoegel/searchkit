"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withConfigWithoutPrompt = exports.withConfig = exports.toDate = exports.toNumber = exports.splitComma = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const lib_1 = require("./lib");
var lib_2 = require("./lib");
Object.defineProperty(exports, "splitComma", { enumerable: true, get: function () { return lib_2.splitComma; } });
Object.defineProperty(exports, "toNumber", { enumerable: true, get: function () { return lib_2.toNumber; } });
Object.defineProperty(exports, "toDate", { enumerable: true, get: function () { return lib_2.toDate; } });
const withConfig = (config) => __awaiter(void 0, void 0, void 0, function* () {
    let mapping;
    yield inquirer_1.default
        .prompt({
        name: 'Generate Example Searchkit Config?',
        type: 'confirm'
    })
        .then((answers) => {
        const chosenAnswer = Object.values(answers)[0];
        if (chosenAnswer) {
            mapping = lib_1.getMapping(config);
            const skConfig = lib_1.getSearchkitConfig(config, mapping);
            const c = lib_1.getSKQuickStartText(Object.assign(Object.assign({}, skConfig), { host: config.host, index: config.index, mapping }));
            fs_1.default.writeFileSync(path_1.default.join(process.cwd(), '/skConfig.md'), c);
        }
    });
    if (config.host) {
        yield inquirer_1.default
            .prompt({
            name: 'Host detected. Destroy index and reinsert index mapping?',
            type: 'confirm'
        })
            .then((answers) => __awaiter(void 0, void 0, void 0, function* () {
            const chosenAnswer = Object.values(answers)[0];
            if (chosenAnswer) {
                yield lib_1.dropIndices(config);
                yield lib_1.createIndices(config);
                yield lib_1.addMappingES7(config);
            }
        }));
        if (config.source) {
            yield inquirer_1.default
                .prompt({
                name: 'Source detected. Insert documents into ES host?',
                type: 'confirm'
            })
                .then((answers) => __awaiter(void 0, void 0, void 0, function* () {
                const chosenAnswer = Object.values(answers)[0];
                if (chosenAnswer) {
                    yield lib_1.indexDocs(config);
                }
            }));
        }
    }
});
exports.withConfig = withConfig;
const withConfigWithoutPrompt = (config) => __awaiter(void 0, void 0, void 0, function* () {
    yield lib_1.dropIndices(config);
    yield lib_1.createIndices(config);
    yield lib_1.addMappingES7(config);
    yield lib_1.indexDocs(config);
});
exports.withConfigWithoutPrompt = withConfigWithoutPrompt;
