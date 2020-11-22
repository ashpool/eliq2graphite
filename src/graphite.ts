// @ts-ignore
import {GraphiteClient} from 'graphite-promise';
import metric from './metric';
import {EliqData} from "./types";

export class Graphite {
  format: string;
  client: GraphiteClient;

  constructor(config: any) {
    this.format = config.format || 'eliq';
    this.client = config.client || new GraphiteClient(config);
  }

  private _log = async (data: any): Promise<any> => await this.client.write(metric.create([this.format, data.intervaltype].join('.'), data), data.timestamp);

  log = async (period: any): Promise<any> => await Promise.all(period.data.map((d: EliqData) => {
      d.intervaltype = period.intervaltype;
      d.timestamp = (new Date(d.time_start).getTime() + new Date(d.time_end).getTime()) / 2;
      return d;
    }).map(this._log));

  logSnapshot = async (snapshot: any): Promise<any> => {
    snapshot.intervaltype = 'snapshot';
    snapshot.timestamp = new Date(snapshot.createddate).getTime();
    return await this._log(snapshot);
  }
}
