const { Schema, model } = require('mongoose');

const CounterSchema = Schema({
	model: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		default: 0,
	},
});

const Counter = model('Counter', CounterSchema);

module.exports = Counter;
