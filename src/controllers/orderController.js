import Order from '../models/Order.js';

// POST /api/orders (admin only) - manually add a sale/order entry
export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// GET /api/orders (admin only) - list all orders plus total revenue
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0
    );
    res.json({ orders, totalRevenue, totalOrders: orders.length });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/orders/:id (admin only)
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};
