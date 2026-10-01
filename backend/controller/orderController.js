import User from "../model/User.js";
import Product from "../model/Product.js";
import Cart from "../model/Cart.js";
import Order from "../model/Order.js";
import { sendOrderEmail } from "../middleware/Email.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: "No User",
      });
    }
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(401).json({
        message: "No item in your cart",
      });
    }

    const validItems = cart.items.filter((item) => item.productId);
    if (validItems.length === 0) {
      await Cart.findOneAndUpdate({ userId }, { items: [] });
      return res.status(400).json({
        message: "Products in your cart are no longer available",
      });
    }

    for (const item of validItems) {
      if (item.productId.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.productId.title}`,
        });
      }
    }
    const orderItems = cart.items.map((item) => ({
      productId: item.productId?._id,
      title: item.productId?.title,
      quantity: Number(item.quantity),
      price: Number(item.productId.price),
    }));
    const total = orderItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount: total,
      paymentMethod: "COD",
      status: "Placed",
    });

    await Cart.findOneAndUpdate({ userId }, { items: [] });

    await sendOrderEmail(
      user.email,
      user.name,
      order._id,
      orderItems,
      total,
      order.paymentMethod,
    );
    await order.save();
    return res.status(200).json({
      message: "Order placed",
      order,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in Placing order",
    });
  }
};
