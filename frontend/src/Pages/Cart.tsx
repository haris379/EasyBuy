import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../components/LoadingBar";
import IncrementBtn from "../components/IncrementBtn";
import DecrementBtn from "../components/DecrementBtn";

const Cart = () => {
  const [cart, setCart] = useState<any>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const calculateTotal = (items: any[]) => {
    return items.reduce((total: any, item: any) => {
      return total + item.quantity * item.productId.price;
    }, 0);
  };
  const loadCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login first");
        return;
      }
      const response = await api.get(`/cart/${userId}`);
      console.log(response.data.cart);
      const items = response.data.cart.items || [];
      setCart(items);
      setTotal(calculateTotal(items));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: any) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.post("/cart/removeItem", {
        userId,
        productId,
      });
      setCart(response.data.cart?.items || []);
      window.dispatchEvent(new Event("cartUpdated"));
      loadCart();
    } catch (error: any) {
      console.log(error);
    }
  };

  const increaseQuantity = async (productId: any) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }
    const previouCart = cart.map((item: any) => ({ ...item }));

    const updatedCart = cart.map((item: any) => {
      if (item.productId._id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    setTotal(calculateTotal(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));

    try {
      await api.put(`/cart/increase/${productId}`, { userId });
    } catch (error) {
      setCart(previouCart);
      setTotal(calculateTotal(previouCart));
      console.error(error);
    }
  };

  const decreaseQuantity = async (productId: any) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    const previousCart = [...cart];

    const currentItem = cart.find(
      (item: any) => item?.productId?._id === productId,
    );

    if (!currentItem) return;
    if (currentItem.quantity === 1) {
      const updatedCart = cart.filter(
        (item: any) => item?.productId?._id !== productId,
      );

      setCart(updatedCart);
      setTotal(calculateTotal(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));

      try {
        await api.put(`/cart/decrease/${productId}`, { userId });
      } catch (error) {
        setCart(previousCart);
        setTotal(calculateTotal(previousCart));
        console.error(error);
      }

      return;
    }
    const updatedCart = cart.map((item: any) => {
      if (item?.productId?._id === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    });

    setCart(updatedCart);
    setTotal(calculateTotal(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    try {
      await api.put(`/cart/decrease/${productId}`, { userId });
    } catch (error) {
      setCart(previousCart);
      setTotal(calculateTotal(previousCart));
      console.error(error);
    }
  };

  const handleOrder = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }
    if (cart.length === 0) {
      return;
    }
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      await api.post(`/order/placeOrder`, { userId });

      window.dispatchEvent(new Event("cartUpdated"));

      setCart([]);
      setTotal(0);
      setLoading(true);

      setTimeout(() => {
        navigate("/orderPlaced");
      }, 1000);
    } catch (error: any) {
      console.error(error.response?.data?.message || "An error occurred");
      setLoading(false);
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

          {loading ? (
            <div className="text-center flex justify-center items-center">
              <LoadingBar />
            </div>
          ) : cart.length === 0 ? (
            <div className="card py-12 text-center">
              <p className="text-ink-soft">Your cart is empty</p>
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
                      <div className="h-8  border border-line rounded-lg px-2 py-1 w-fit p-2">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.productId._id)}
                            className="w-6 h-6 flex items-center justify-center text-lg text-ink-soft "
                          >
                            <DecrementBtn />
                          </button>
                          <span className="w-6 text-sm text-center text-black">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.productId._id)}
                            className="w-6 h-6 flex items-center justify-center text-lg text-ink-soft "
                          >
                            <IncrementBtn />
                          </button>
                        </div>
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
              <div className="">
                <h2>
                  <strong>Total Amount</strong> : <span>{total}</span>
                </h2>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => handleOrder()}
              disabled={cart.length === 0 || loading}
              className="w-1/2 py-3 m-5 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-lg  duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
