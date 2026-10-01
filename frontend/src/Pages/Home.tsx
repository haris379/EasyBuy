import { useState, useEffect } from "react";
import api from "../api/axios";
import LoadingBar from "../components/LoadingBar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [addingId, setAddingId] = useState<string | null>(null);
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
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please Login to continue");
      return;
    }
    if (addingId === productId) return;
    setAddingId(productId);
    window.dispatchEvent(new CustomEvent("cartDelta", { detail: 1 }));
    try {
      await api.post("/cart/addToCart", { userId, productId });
    } catch (error: any) {
      window.dispatchEvent(new CustomEvent("cartDelta", { detail: -1 }));
      console.log(
        error.response?.data?.message || "Error adding Product in Cart",
      );
    } finally {
      setAddingId(null);
    }
  };
  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get("/product/allCategories");
      setCategory(response.data.categories);
    } catch (error: any) {
      console.error(
        error.response?.data?.message || "Error filtering products",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (selectedcat: string) => {
    try {
      setLoading(true);

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
      setLoading(false);
    }
  };
  useEffect(() => {
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
                  className="inline-block w-60 py-3 bg-[#800020] hover:bg-[#D45060] text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
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
