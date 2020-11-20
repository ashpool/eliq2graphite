import {GraphiteClient} from 'graphite-promise';
import metric from './metric';
import {EliqData} from "./index";

export class Graphite {
  format: string;
  client: any;

  constructor(config: any) {
    this.format = config.format || 'eliq';
    this.client = config.client || new GraphiteClient(config);
  }

  _log(data: any): Promise<any>  {
    const that = this;
    return new Promise(function (resolve, reject) {
      const m = metric.create([that.format, data.intervaltype].join('.'), data);
      return that.client.write(m, data.timestamp).then(function (value: any) {
        return resolve(value);
      }, function (error: any) {
        reject(error);
      });
    });
  }

  log(period: any): Promise<any>  {
    const that = this;
    return Promise.all(period.data.map((d: EliqData) => {
      d.intervaltype = period.intervaltype;
      d.timestamp = (new Date(d.time_start).getTime() + new Date(d.time_end).getTime()) / 2;
      return d;
    }).map(that._log));
  }

  logSnapshot(snapshot: any): Promise<any> {
    snapshot.intervaltype = 'snapshot';
    snapshot.timestamp = new Date(snapshot.createddate).getTime();
    return this._log(snapshot);
  }
}
