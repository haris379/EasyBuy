import { useState, useEffect } from "react";

import api from "../api/axios";
import LoadingBar from "../components/LoadingBar";

import { increment } from "../reduxStore/cartSlice";
import { useAppDispatch, useAppSelector } from "../reduxStore/cartHooks";
import { setLoading } from "../reduxStore/loadingSlice.ts";

interface HomeProps {
  loadCart: () => void;
}

const Home = ({ loadCart }: HomeProps) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const userCart: any = useAppSelector((state) => state.userCart.userCart);
  const loading = useAppSelector((state) => state.loadingSlice.loading);

  const dispatch = useAppDispatch();

  const loadProducts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await api.get("/product");

      setProducts(response.data.products);
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    dispatch(setLoading(true));
    try {
      const response = await api.get("/product/allCategories");
      setCategory(response.data.categories);
    } catch (error: any) {
      console.error(
        error.response?.data?.message || "Error filtering products",
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCategoryChange = async (selectedcat: string) => {
    dispatch(setLoading(true));
    try {
      if (!selectedcat) {
        const response = await api.get("/product");
        setProducts(response.data.products);
        return;
      }
      const response = await api.get(
        `/product/categories?category=${encodeURIComponent(selectedcat)}`,
      );
      setProducts(response.data.products);
    } catch (error: any) {
      console.error(
        error.response?.data?.message || "Error filtering products",
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addToCart = async (productId: any) => {
    if (!userId || !token) {
      alert("Please Login to continue");
      return;
    }
    userCart.map((item: any) => {
      if (item.productId._id === productId) {
        return { item, quantity: item.quantity + 1 };
      }
    });

    dispatch(increment());
    try {
      await api.post("/cart/addToCart", { userId, productId });
    } catch (error: any) {
      console.log("Error adding Product in Cart", error);
    }
  };

  useEffect(() => {
    loadCart();
    loadProducts();
    getAllCategories();
  }, []);

  return (
    <>
      <div
        className="flex justify-center items-center w-full rounded-2xl"
        onChange={(e: any) => handleCategoryChange(e.target.value)}
      >
        <select className=" border p-2 input-field sm:w-52">
          <option value="">All Categories</option>
          {category.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center flex justify-center items-center">
          <LoadingBar />
        </div>
      ) : products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-4 m-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: any) => (
            <div
              className="bg-[#FFF9F2] w-full max-w-xs h-80 rounded-xl border flex flex-col items-center"
              key={product._id}
            >
              <img
                src={product.image}
                alt={product.title}
                className="p-3 h-1/2 w-auto object-contain rounded-4xl"
              />

              <div className="m-4 font-semibold">
                <p>
                  <span className="font-bold">{product.title}</span>
                </p>

                <p>
                  <span className="font-bold">Rs. {product.price}</span>
                </p>
              </div>

              <div className="text-center m-2 w-full">
                <button
                  onClick={() => addToCart(product._id)}
                  className="inline-block w-60 py-3 bg-black text-white font-semibold rounded-lg transition duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
