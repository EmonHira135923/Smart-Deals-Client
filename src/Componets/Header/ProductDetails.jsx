import React, { useRef } from "react";
import { useLoaderData } from "react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import useAuth from "../hooks/useAuth";

const ProductDetails = () => {
  const product = useLoaderData();
  const usepopupref = useRef(null);
  const { user } = useAuth();

  // Show Modal
  const handlepopup = () => {
    usepopupref.current.showModal();
  };

  // Handle Form
  const handleform = (e) => {
    e.preventDefault();
    const productid = product._id;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const buyer_contact = e.target.buyer_contact.value;
    const buyer_image = e.target.buyer_image.value;
    const bid_price = e.target.bid_price.value;
    const newbids = {
      productid,
      name,
      email,
      buyer_contact,
      buyer_image,
      bid_price,
      status: "pending",
    };
    console.log(newbids);
    // feteh and post bids for backend insert in mongodb
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[420px] object-cover rounded-xl"
            />
          </div>

          {/* Product Info */}
          <div>
            <span className="inline-block mb-2 px-4 py-1 text-sm rounded-full bg-purple-100 text-purple-600">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.title}
            </h1>

            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Price */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">Price Range</p>
              <p className="text-2xl font-bold text-purple-600">
                ৳ {product.price_min.toLocaleString()} – ৳{" "}
                {product.price_max.toLocaleString()}
              </p>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
              <div>
                <span className="font-medium">Condition:</span>{" "}
                {product.condition}
              </div>
              <div>
                <span className="font-medium">Usage:</span> {product.usage}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {product.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {new Date(product.created_at).toDateString()}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handlepopup}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              Place a Bid
            </button>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog
              ref={usepopupref}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box max-w-lg">
                {/* Header */}
                <h3 className="font-bold text-2xl text-center text-purple-600 mb-2">
                  Welcome to Bid 🎯
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  Place your bid carefully. Seller will review your offer before
                  confirmation.
                </p>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleform}>
                  {/* Buyer Name */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Your Name</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={user.displayName}
                      name="name"
                      placeholder="Enter your name"
                      className="input input-bordered w-full"
                      readOnly
                      disabled
                    />
                  </div>

                  {/* Buyer Email */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      name="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      readOnly
                      disabled
                    />
                  </div>

                  {/* Buyer Contact */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Contact Number
                      </span>
                    </label>
                    <input
                      type="text"
                      name="buyer_contact"
                      placeholder="01XXXXXXXXX"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  {/* Buyer Image */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Profile Image URL
                      </span>
                    </label>
                    <input
                      type="text"
                      name="buyer_image"
                      placeholder="https://image-url.com"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  {/* Bid Price */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Bid Price (৳)
                      </span>
                    </label>
                    <input
                      type="number"
                      name="bid_price"
                      placeholder="Enter your bid amount"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  {/* Actions */}
                  <div className="modal-action flex justify-between">
                    <button
                      type="submit"
                      className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none"
                    >
                      Submit Bid
                    </button>

                    <form method="dialog">
                      <button className="btn btn-outline">Cancel</button>
                    </form>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </div>

        {/* Seller Info */}
        <div className="border-t p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Seller Information</h2>

          <div className="flex items-center gap-4">
            <img
              src={product.seller_image}
              alt={product.seller_name}
              className="w-16 h-16 rounded-full object-cover"
            />

            <div>
              <p className="text-lg font-medium text-gray-900">
                {product.seller_name}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                {product.seller_contact}
              </p>
              <span className="inline-block mt-1 text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                {product.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
