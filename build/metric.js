"use strict";
module.exports = {
    /**
     * Creates a metrics object out of format string and data
     * @param format format.string
     * @param data { avgpower: 1234, energy: 4321 }
     * @returns { format.string: { avgpower: 1234, energy: 4321, power: 1313 } }
     */
    create: function (format, data) {
        const formatArray = format.split('.');
        const properties = formatArray.slice(0);
        let metric = {};
        metric[properties.pop()] = this._cleanData(data);
        while (properties.length > 0) {
            const temp = {};
            temp[properties.pop()] = metric;
            metric = temp;
        }
        return metric;
    },
    _cleanData: function (data) {
        const d = {};
        ['power', 'avgpower', 'energy'].filter(p => data[p]).map(p => d[p] = data[p]);
        return d;
    }
};
