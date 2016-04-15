module.exports = {
  /**
   * Creates a metrics object out of format string and data
   * @param format format.string
   * @param data { avgpower: 1234, energy: 4321 }
   * @returns {{}} { format.string: { avgpower: 1234, energy: 4321 } }
   */
  create: function create(format, data) {
    var formatArray = format.split('.'),
      properties = formatArray.slice(0),
      metric = {};
    metric[properties.pop()] = {
      avgpower: data.avgpower,
      energy: data.energy
    };
    while (properties.length > 0) {
      var temp = {};
      temp[properties.pop()] = metric;
      metric = temp;
    }
    return metric;
  }
};
