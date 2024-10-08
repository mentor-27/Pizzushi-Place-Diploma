const Order = require('../models/Order');

function getOrders() {
	return Order.find();
}

function removeOrder(orderId) {
	if (!orderId) {
		throw new Error('Order id is empty');
	}

	return Order.deleteOne({ _id: orderId });
}

module.exports = {
	getOrders,
	removeOrder,
};
