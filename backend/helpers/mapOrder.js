function mapOrder(order) {
	return {
		id: order._id,
		user: order.user,
		guestId: order.guestId,
		cart: order.cart,
		status: order.status,
		reciever: order.reciever,
		createdAt: order.createdAt,
		orderNumber: order.orderNumber,
	};
}

module.exports = mapOrder;
