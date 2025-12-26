import React from "react";
import { NavLink } from "react-router";
import {
  Search,
  ArrowRight,
  TrendingUp,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";
import RecentProduct from "./RecentProduct";

const Banner = () => {
  return (
    <div className="bg-gradient-to-b from-white to-purple-50">
      {/* Main Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Deal Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  Products
                </span>{" "}
                in a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Smart
                </span>{" "}
                Way!
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                SmartDeals helps you sell, resell, and shop from trusted local
                sellers — all in one place! Experience seamless buying and
                selling with secure transactions.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  Secure Deals
                </span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">
                  Best Prices
                </span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  Trusted Sellers
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="space-y-4">
              <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search for products, categories, brands..."
                  className="w-full pl-10 pr-4 py-3.5 text-gray-700 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink
                to="/all-product"
                className="group flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Explore All Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>

              <NavLink
                to="/create-product"
                className="group flex items-center justify-center space-x-2 px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-xl font-medium hover:bg-purple-50 shadow-sm hover:shadow transition-all duration-200"
              >
                <Sparkles className="w-5 h-5" />
                <span>Post Your Product</span>
              </NavLink>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Active Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-8 lg:p-12">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full translate-y-8 -translate-x-8 opacity-50"></div>

              {/* Hero Content */}
              <div className="relative z-10 space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-bold">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        Hot Deal Today!
                      </h3>
                      <p className="text-sm text-gray-600">
                        Limited Time Offer
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Smartphone</span>
                      <span className="font-bold text-purple-600">$299</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Only 3 left at this price!
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Start Selling Now</h3>
                    <span className="text-2xl">🚀</span>
                  </div>
                  <p className="text-sm opacity-90">
                    Join thousands of successful sellers on SmartDeals
                  </p>
                  <button className="mt-4 w-full py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Get Started Free
                  </button>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600">✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Verified Sellers Only
                      </p>
                      <p className="text-xs text-gray-500">
                        100% authentic products
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <RecentProduct />
      </div>
    </div>
  );
};

export default Banner;
