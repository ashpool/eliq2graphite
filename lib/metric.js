module.exports = {
    /**
     * Creates a metrics object out of format string and data
     * @param format format.string
     * @param data { avgpower: <number>, energy: <number>, power: <number>}
     * @returns {{}} { format.string: { avgpower: <number>, energy: <number>, power: <number> } }
     */
    create: function create (format, data) {
        var formatArray = format.split('.'),
            properties = formatArray.slice(0),
            metric = {},
            values = {};

        for(var property in data) {
            if(data.hasOwnProperty(property)) {
                values[property] = data[property];
            }
        }

        metric[properties.pop()] = values;

        while (properties.length > 0) {
            var temp = {};
            temp[properties.pop()] = metric;
            metric = temp;
        }
        return metric;
    }
};
