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
exports.Graphite = void 0;
// @ts-ignore
const graphite_promise_1 = require("graphite-promise");
const metric_1 = __importDefault(require("./metric"));
class Graphite {
    constructor(config) {
        this._log = (data) => __awaiter(this, void 0, void 0, function* () { return yield this.client.write(metric_1.default.create([this.format, data.intervaltype].join('.'), data), data.timestamp); });
        this.log = (period) => __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(period.data.map((d) => {
                d.intervaltype = period.intervaltype;
                d.timestamp = (new Date(d.time_start).getTime() + new Date(d.time_end).getTime()) / 2;
                return d;
            }).map(this._log));
        });
        this.logSnapshot = (snapshot) => __awaiter(this, void 0, void 0, function* () {
            snapshot.intervaltype = 'snapshot';
            snapshot.timestamp = new Date(snapshot.createddate).getTime();
            return yield this._log(snapshot);
        });
        this.format = config.format || 'eliq';
        this.client = config.client || new graphite_promise_1.GraphiteClient(config);
    }
}
exports.Graphite = Graphite;
