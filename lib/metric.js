module.exports = {
	create: function create (format, value) {
		var formatArray = format.split('.'),
			properties = formatArray.slice(0),
			metric = {};
		metric[properties.pop()] = value;
		while (properties.length > 0) {
			var temp = {};
			temp[properties.pop()] = metric;
			metric = temp;
		}
		return metric;
	}
};
