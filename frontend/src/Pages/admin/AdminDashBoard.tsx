import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const AdminDashBoard = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data.products);
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      await api.delete(`/product/delete/${id}`);
      alert("Product Deleted Successfully");
      loadProducts();
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center px-4 sm:px-6">
        <div className="my-6 sm:my-10 w-full">
          <div className="page-shell w-full max-w-4xl">
            <Link to="/" className="text-sm  text-black p-3 rounded-2xl">
              Back
            </Link>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold mt-1">
                  Product List
                </h2>
              </div>
              <Link
                to="/admin/products/add-product"
                className="text-sm bg-blue-700 text-white px-4 py-3 rounded-2xl w-full sm:w-auto text-center"
              >
                + Add New Product
              </Link>
            </div>

            <div className="card overflow-x-auto">
              <table className="w-full min-w-[640px] border border-black text-sm">
                <thead>
                  <tr className="bg-navy text-blacl text-left">
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                    <th className="px-4 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product: any) => (
                    <tr
                      key={product._id}
                      className="border-t border-line hover:bg-paper transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-ink">
                        {product.title}
                      </td>

                      <td className="px-4 py-3 price-mono text-navy">
                        {product.price}
                      </td>

                      <td className="px-4 py-3">
                        {product.stock < 1
                          ? handleDelete(product._id)
                          : product.stock}
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Link
                          to={`/admin/products/update/${product._id}`}
                          className="text-navy font-medium hover:underline mr-2 sm:mr-4"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-sm bg-red-700 text-white px-3 py-2 rounded-xl"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
