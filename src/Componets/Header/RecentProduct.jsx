import React from "react";
import { NavLink } from "react-router";
import { TrendingUp } from "lucide-react";
import ProductCard from "./ProductCard";

const RecentProduct = ({ latestproduct }) => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg mb-6">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Products
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the latest deals and trending products from trusted sellers
          </p>
        </div>

        {/* Product Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {latestproduct.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <NavLink
            to="/all-product"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors"
          >
            <span>Browse All Products</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RecentProduct;
