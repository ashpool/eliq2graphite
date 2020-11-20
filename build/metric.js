"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a metrics object out of format string and data
 * @param format format.string
 * @param data { avgpower: 1234, energy: 4321 }
 * @returns { format.string: { avgpower: 1234, energy: 4321, power: 1313 } }
 */
const create = (format, data) => {
    const formatArray = format.split('.');
    const properties = formatArray.slice(0);
    let metric = {};
    // @ts-ignore
    metric[properties.pop()] = _cleanData(data);
    while (properties.length > 0) {
        const temp = {};
        // @ts-ignore
        temp[properties.pop()] = metric;
        metric = temp;
    }
    return metric;
};
const _cleanData = (data) => {
    const d = {};
    // @ts-ignore
    ['power', 'avgpower', 'energy'].filter(p => data[p]).map(p => d[p] = data[p]);
    return d;
};
exports.default = {
    create
};
