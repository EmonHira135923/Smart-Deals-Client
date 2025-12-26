import React from "react";
import { NavLink } from "react-router";
import { Eye, ShoppingBag } from "lucide-react";

const AllProduct = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg mb-6">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Products
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our extensive collection of products from trusted
            sellers
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Product Card */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-indigo-100">
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-purple-300" />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-5">
              <h1 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                Product Title
              </h1>

              <p className="text-2xl font-bold text-gray-900 mb-4">$120</p>

              <button className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <Eye className="w-5 h-5" />
                <span>View Details</span>
              </button>
            </div>
          </div>

          {/* Repeat more cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
