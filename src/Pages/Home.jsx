import React, { Suspense } from "react";
import Banner from "../Componets/Header/Banner";
import Baseurl from "../Componets/utils/Baseurl";

const latestproductpromise = fetch(`${Baseurl}/latest-products`).then((res) =>
  res.json()
);

// Loading Fallback Component
const LoadingFallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="max-w-7xl w-full">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-200 to-indigo-200 shadow-lg mb-6 animate-pulse">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-300 to-indigo-300 rounded"></div>
          </div>
          <div className="h-12 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden h-full relative animate-pulse"
            >
              {/* Top Badges Skeleton */}
              <div className="absolute top-3 left-3 right-3 z-10 flex justify-between">
                <div className="flex flex-col gap-2">
                  <div className="px-3 py-1.5 bg-red-200 rounded-full w-16 h-7"></div>
                  <div className="px-3 py-1.5 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full w-24 h-7"></div>
                </div>
                <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
              </div>

              {/* Image Skeleton */}
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full mb-2"></div>
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Title Skeleton */}
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 w-3/4"></div>

                {/* Rating Skeleton */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded"
                      ></div>
                    ))}
                  </div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 mb-5">
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
                </div>

                {/* Price Section Skeleton */}
                <div className="mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                  </div>

                  {/* Features Skeleton */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                  </div>
                </div>

                {/* Buttons Skeleton */}
                <div className="flex gap-3 mt-auto">
                  <div className="flex-1 h-12 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-xl"></div>
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-xl"></div>
                </div>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
            </div>
          ))}
        </div>

        {/* CTA Button Skeleton */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl font-medium w-48 mx-auto h-12 animate-pulse"></div>
        </div>
      </div>

      {/* Animated Dots for Extra Effect */}
      <div className="flex space-x-2 mt-12">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 font-medium animate-pulse">
          Loading awesome products...
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <Banner latestproductpromise={latestproductpromise} />
      </Suspense>
    </div>
  );
};

export default Home;
