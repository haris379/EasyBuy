import Cart from "../model/Cart.js";
import Product from "../model/Product.js";

// AddtoCart
export const addItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const item = cart.items.find((p) => p.productId.toString() === productId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }
    await cart.save();
    res.status(200).json({
      message: "Product added to your cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Adding Product in Cart", error });
  }
};

// RemoveFromCart
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({
        message: "Cart is now empty",
        cart: { items: [] },
      });
    }
    await cart.save();
    await cart.populate("items.productId");

    res.json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Removing Product in Cart", error });
  }
};

// Get cart with userId
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "No Cart Found" });
    }
    res.status(200).json({
      message: "Cart Fetched Successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Cart", error });
  }
};

// Increase Product Quantity
export const increaseQunatity = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "No Cart Found" });
    }
    const item = cart.items.find((p) => p.productId.toString() === productId);
    item.quantity += 1;
    await cart.save();
    await cart.populate("items.productId");

    res.status(200).json({
      message: "Quantity Increases",
      cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Increasing Quantity of Product in Cart", error });
  }
};

// Decrease Product Quantity
export const decreaseQunatity = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "No Cart Found" });
    }
    const item = cart.items.find((p) => p.productId.toString() === productId);
    if (item.quantity <= 1) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId,
      );
    } else {
      item.quantity -= 1;
    }
    await cart.save();
    await cart.populate("items.productId");

    res.status(200).json({
      message: "Quantity Decreases",
      cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Decreases Quantity of Product in Cart", error });
  }
};

// Calculate Total Amount
export const getTotalAmount = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "No Cart Found" });
    }

    const total = cart.items.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);
    return res.status(200).json({ message: "Total amount calculated", total });
    // console.log(total);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Calculation Total", error });
  }
};
