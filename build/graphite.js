"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graphite = void 0;
const graphite_promise_1 = require("graphite-promise");
const metric_1 = __importDefault(require("./metric"));
class Graphite {
    constructor(config) {
        this.format = config.format || 'eliq';
        this.client = config.client || new graphite_promise_1.GraphiteClient(config);
    }
    _log(data) {
        const that = this;
        return new Promise(function (resolve, reject) {
            const m = metric_1.default.create([that.format, data.intervaltype].join('.'), data);
            return that.client.write(m, data.timestamp).then(function (value) {
                return resolve(value);
            }, function (error) {
                reject(error);
            });
        });
    }
    log(period) {
        const that = this;
        return Promise.all(period.data.map((d) => {
            d.intervaltype = period.intervaltype;
            d.timestamp = (new Date(d.time_start).getTime() + new Date(d.time_end).getTime()) / 2;
            return d;
        }).map(that._log));
    }
    logSnapshot(snapshot) {
        snapshot.intervaltype = 'snapshot';
        snapshot.timestamp = new Date(snapshot.createddate).getTime();
        return this._log(snapshot);
    }
}
exports.Graphite = Graphite;
