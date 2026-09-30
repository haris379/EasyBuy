import { useState, useEffect } from "react";
import api from "../api/axios";
import LoadingBar from "../components/LoadingBar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState<string>("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadProducts = async () => {
    try {
      const response = await api.get("/product");

      setProducts(response.data.products);
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: any) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please Login to continue");
        return;
      }
      const response = await api.post("/cart/addToCart", { userId, productId });
      setMsg(response.data.message);
      setTimeout(() => {
        setMsg("");
      }, 1000);

      window.dispatchEvent(new Event("cartUpdated")); // <-- add this

      // setCartCount(response.data.cart.items.length);

      // setCartCount(
      //   response.data.cart.items.reduce(
      //     (total: number, item: any) => total + item.quantity,
      //     0,
      //   ),
      // );
    } catch (error: any) {
      console.log(
        error.response?.data?.message || "Error adding Product in Cart",
      );
    }
  };
  const getAllCategories = async () => {
    try {
      const response = await api.get("/product/allCategories");
      setCategory(response.data.categories);
    } catch (error) {}
  };

  const handleCategoryChange = async (selectedcat: string) => {
    try {
      if (!selectedcat) {
        loadProducts();
        return;
      }
      const response = await api.get(
        `/product/categories?category=${encodeURIComponent(selectedcat)}`,
      );
      setProducts(response.data.products);
    } catch (error: any) {
      console.log(error.response?.data?.message || "Error filtering products");
    }
  };
  useEffect(() => {
    loadProducts();
    getAllCategories();
  }, []);

  return (
    <>
      <div className="m-6">
        {msg && (
          <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-center text-sm text-blue-700">
            {msg}
          </div>
        )}
      </div>
      <div
        className="flex justify-center items-center"
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
              className="bg-gray-100 w-full max-w-xs h-80 rounded-xl border flex flex-col items-center"
              key={product._id}
            >
              <img
                src={product.image}
                alt={product.title}
                className="p-3 h-1/2 w-auto object-contain"
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
                  className="inline-block w-60 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
                >
                  Add to Cart
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
