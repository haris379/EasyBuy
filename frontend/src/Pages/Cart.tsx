import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoadingBar from "../components/LoadingBar";
import IncrementBtn from "../components/IncrementBtn";
import DecrementBtn from "../components/DecrementBtn";
import { useEffect } from "react";

interface CartProps {
  removeItem: (productId: any) => void;
  increaseQuantity: (productId: any) => void;
  decreaseQuantity: (productId: any) => void;
  loadCart: () => void;
  userCart: any[];
  loading: boolean;
  total: number;
}
const Cart = ({
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  userCart,
  loading,
  total,
  loadCart,
}: CartProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleOrder = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }
    if (userCart.length === 0) {
      return;
    }
    try {
      // setLoading(true);
      const userId = localStorage.getItem("userId");
      await api.post(`/order/placeOrder`, { userId });

      window.dispatchEvent(new Event("cartUpdated"));

      // setCart([]);
      // setTotal(0);
      // setLoading(true);

      setTimeout(() => {
        navigate("/orderPlaced");
      }, 1000);
    } catch (error: any) {
      console.error(error.response?.data?.message || "An error occurred");
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (!userId) {
      alert("Please Login to add items in your cart");
      return;
    }
    loadCart();
  }, []);

  return (
    <>
      <div className="min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="font-bold text-2xl text-ink">Your Cart</h1>
          </div>

          {loading ? (
            <div className="text-center flex justify-center items-center">
              <LoadingBar />
            </div>
          ) : !userId ? (
            <div className="card py-12 text-center">
              <p className="text-ink-soft">
                Please Login to add items your cart
              </p>
            </div>
          ) : userCart.length === 0 ? (
            <div className="card py-12 text-center">
              <p className="text-ink-soft">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userCart.map((item: any) => {
                if (!item.productId) return null;
                console.log(item.productId);
                return (
                  <div
                    key={item._id}
                    className="card p-4  bg-[#FFF9F2] sm:p-5 border-2 border-[#800020] rounded-2xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="w-20 h-20 object-cover rounded-lg bg-paper shrink-0"
                        />

                        <div className="flex flex-col">
                          {/* Product Price and Title  */}
                          <div className="min-w-0">
                            <h2 className="font-semibold text-ink truncate">
                              {item.productId.title}
                            </h2>
                            <p className="text-sm text-ink-soft  font-light">
                              Rs.{item.productId.price}
                            </p>
                          </div>

                          {/* Buttons  */}
                          <div className="h-7 w-fit border border-line rounded-md mt-2">
                            <div className="flex h-full items-center px-2 gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(item.productId._id)
                                }
                                className="w-5 h-5 flex items-center justify-center text-ink-soft"
                              >
                                <DecrementBtn />
                              </button>
                              <span className="w-6 text-sm text-center text-black">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(item.productId._id)
                                }
                                className="w-4 h-3 flex items-center justify-center text-ink-soft"
                              >
                                <IncrementBtn />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="sm:w-28 text-left sm:text-right">
                        <p className="text-sm font-semibold text-ink">
                          Rs. {item.quantity * item.productId.price}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId._id)}
                        className="text-sm bg-[#800020] text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors w-full sm:w-auto"
                      >
                        Remove item
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
              disabled={userCart.length === 0 || loading}
              className="w-1/2 py-3 m-5 bg-[#7A1F3D] hover:bg-[#92284A] text-[#F3E6D5] text-center font-semibold rounded-lg  duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
