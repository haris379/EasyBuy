import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [msg, setMsg] = useState<string>("");

  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setMsg("Please login first");
        return;
      }
      const response = await api.get(`/cart/${userId}`);

      const items = response.data.cart.items || [];
      setCart(items);

      const totalAmount = items.reduce((total: any, item: any) => {
        return total + item.quantity * item.productId.price;
      }, 0);
      setTotal(totalAmount);
    } catch (error: any) {
      console.log(error);
    }
  };

  const removeItem = async (productId: any) => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.post("/cart/removeItem", {
        userId,
        productId,
      });
      console.log(response.data);

      setCart(response.data.cart?.items || []);
      loadCart();
    } catch (error: any) {
      console.log(error);
    }
  };

  const increaseQuantity = async (productId: any) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.put(`/cart/increase/${productId}`, { userId });
      setCart(response.data.cart.items);
      loadCart();
    } catch (error) {}
  };
  const decreaseQuantity = async (productId: any) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.put(`/cart/decrease/${productId}`, { userId });
      setCart(response.data.cart.items);

      loadCart();
    } catch (error) {}
  };
  const handleOrder = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.post(`/order/placeOrder`, { userId });

      window.dispatchEvent(new Event("cartUpdated"));
      setCart([]);
      setTotal(0);
      setMsg(response.data.message);
      setTimeout(() => {
        setMsg("");
      }, 1000);
      setTimeout(() => {
        navigate("/orderPlaced");
      }, 250);
    } catch (error: any) {
      setMsg(error.response?.data?.message || "An error occurred");
    }
  };
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <>
      <div className="min-h-[70vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="font-bold text-2xl text-ink">Your Cart</h1>
          </div>
          {msg && (
            <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-center text-sm text-blue-700">
              {msg}
            </div>
          )}
          {cart.length === 0 ? (
            <div className="card py-12 text-center">
              <p className="text-ink-soft">No Item in your cart</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item: any) => {
                if (!item.productId) return null;
                return (
                  <div key={item._id} className="card p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="w-20 h-20 object-cover rounded-lg bg-paper shrink-0"
                        />
                        <div className="min-w-0">
                          <h2 className="font-semibold text-ink truncate">
                            {item.productId.title}
                          </h2>
                          <p className="text-sm text-ink-soft mt-1">
                            {item.productId.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 border border-line rounded-lg px-2 py-1 w-fit">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.productId._id)}
                          className="w-8 h-8 flex items-center justify-center text-lg text-ink-soft hover:text-navy transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 text-sm text-center text-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.productId._id)}
                          className="w-8 h-8 flex items-center justify-center text-lg text-ink-soft hover:text-navy transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="sm:w-28 text-left sm:text-right">
                        <p className="text-sm font-semibold text-ink">
                          Rs. {item.quantity * item.productId.price}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId._id)}
                        className="text-sm bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="">
            <h2>
              <strong>Total Amount</strong> : <span>{total}</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleOrder()}
              className="w-1/2 py-3 m-5 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-lg transition duration-200 cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
