import React from "react";
import {
  AlarmPlus,
  Eye,
  ShoppingBag,
  Star,
  Heart,
  Truck,
  Shield,
} from "lucide-react";
import { NavLink } from "react-router";

const ProductCard = ({ product }) => {
  // Calculate discount percentage if original price exists
  const hasDiscount =
    product.original_price && product.original_price > product.price_min;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.original_price - product.price_min) /
          product.original_price) *
          100
      )
    : 0;

  // Generate random rating (for demo - replace with actual rating from product)
  const rating = product.rating || Math.random() * (5 - 3.5) + 3.5;
  const reviewCount = product.review_count || Math.floor(Math.random() * 500);

  return (
    <div className="group bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-purple-100/50 hover:border-purple-200 transition-all duration-500 overflow-hidden h-full relative">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between">
        {/* Category/Discount Badge */}
        <div className="flex flex-col gap-2">
          {hasDiscount && (
            <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
              -{discountPercentage}%
            </span>
          )}
          <span className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1 w-fit">
            <AlarmPlus className="w-3 h-3" />
            {product.category || "New Arrival"}
          </span>
        </div>

        {/* Wishlist Button */}
        <button className="w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-all duration-300">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-square relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-2 min-h-[3.5rem]">
          {product.title || product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {rating.toFixed(1)} ({reviewCount} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price_min}
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                ${product.original_price}
              </span>
            )}
          </div>

          {/* Features Icons */}
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1 text-xs text-green-600">
              <Truck className="w-3 h-3" />
              Free Shipping
            </span>
            <span className="flex items-center gap-1 text-xs text-blue-600">
              <Shield className="w-3 h-3" />
              2-Year Warranty
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <NavLink
            to={`/product/${product._id}`}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </NavLink>

          <button className="px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Floating Tag for Best Seller/New */}
      {product.is_bestseller && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-xs font-bold rounded-full shadow-lg rotate-12">
          BEST SELLER
        </div>
      )}

      {product.is_new && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 text-xs font-bold rounded-full shadow-lg rotate-12">
          NEW
        </div>
      )}
    </div>
  );
};

export default ProductCard;
