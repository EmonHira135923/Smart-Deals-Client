import React, { useEffect, useState } from "react";
import Baseurl from "../utils/Baseurl";
import useAuth from "../hooks/useAuth";

const Myproduct = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${Baseurl}/my-products?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setProducts(data);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading)
    return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        My Products ({products.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Min Price</th>
              <th className="px-4 py-2 border">Max Price</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{product.title}</td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border">{product.min_price}</td>
                <td className="px-4 py-2 border">{product.max_price}</td>
                <td className="px-4 py-2 border">{product.status}</td>
                <td className="px-4 py-2 border">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Bids
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myproduct;
