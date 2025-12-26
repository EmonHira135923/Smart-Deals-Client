import React from "react";
import { NavLink } from "react-router";
import { Eye, Heart, Star, ShoppingBag, TrendingUp } from "lucide-react";

const RecentProduct = () => {
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
        <div className="max-w-sm mx-auto">
          <div className="group bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 overflow-hidden">
            {/* Product Image */}
            <div className="relative overflow-hidden">
              {/* Main Image */}
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-indigo-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <ShoppingBag className="w-16 h-16 text-purple-300 mx-auto mb-2" />
                    <p className="text-purple-500 font-medium">Product Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-5">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-1">
                Apple iPhone 14 Pro Max - 256GB
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                Brand new sealed box with 2 years warranty. Latest model with
                advanced camera features.
              </p>

              {/* Price and Seller */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      $1,199
                    </span>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <NavLink
                  to="/product-details"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </NavLink>

                <button className="px-4 py-3 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
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
