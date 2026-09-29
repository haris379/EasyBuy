import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import api from "../../api/axios.ts";
import { useNavigate, useParams } from "react-router-dom";

interface ProductObject {
  title: string;
  description: string;
  category: string;
  price: number | undefined;
  image: string;
  stock: number | undefined;
}

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [msg, setMsg] = useState<string>("");


  const [form, setForm] = useState<ProductObject>({
    title: "",
    description: "",
    category: "",
    price: undefined,
    image: "",
    stock: undefined,
  });

  const loadProduct = async () => {
    try {
      const response = await api.get("/product");
      const product = response.data.products.find((p: any) => p._id === id);
      if (!product) {
        alert("Product not found");
        setTimeout(() => {
          navigate("/admin/products/");
        }, 1000);
      }
      setForm(product);
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.put(`/product/update/${id}`, form);
      setMsg(response.data.message);
      setTimeout(() => {
        navigate("/admin/products/");
      }, 1000);
    } catch (error: any) {
      setMsg(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
          </div>

          {msg && (
            <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-center text-sm text-blue-700">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input
                id="title"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="text"
                placeholder="Enter Product Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                id="description"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="text"
                placeholder="Enter Product description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                id="category"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="text"
                placeholder="Enter Product category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                id="price"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="number"
                placeholder="Enter Product price"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                id="image"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="text"
                placeholder="Enter Product image"
                name="image"
                value={form.image}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                id="stock"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="number"
                placeholder="Enter Product Stock"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
