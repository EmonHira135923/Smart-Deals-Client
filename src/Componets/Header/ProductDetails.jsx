import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import useAuth from "../hooks/useAuth";
import Baseurl from "../utils/Baseurl";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const product = useLoaderData();
  const usepopupref = useRef(null);
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = product._id;
  // console.log(id);

  // useeffect

  useEffect(() => {
    fetch(`${Baseurl}/products/by/bids/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
        setLoading(false);
      });
  }, [id, loading]);

  if (loading) {
  }

  // Show Modal
  const handlepopup = () => {
    usepopupref.current.showModal();
  };

  // Handle Form
  const handleform = (e) => {
    e.preventDefault();
    const productId = product._id;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const buyer_contact = e.target.buyer_contact.value;
    const buyer_image = e.target.buyer_image.value;
    const bid_price = Number(e.target.bid_price.value); // convert to number

    const newBid = {
      productId,
      buyer_name: name,
      buyer_email: email,
      buyer_contact,
      buyer_image,
      bid_price,
      status: "pending",
    };

    // Post bid to backend
    fetch(`${Baseurl}/create-bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result.insertedId) {
          // Close modal
          usepopupref.current.close();
          toast.success("Bid Successfully Added");

          // Add _id and update state
          newBid._id = data.result._id;
          const updatedBids = [...bids, newBid];
          updatedBids.sort((a, b) => a.bid_price - b.bid_price);
          setBids(updatedBids);

          // Reset form
          e.target.reset();
        }
      });
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
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none"
                    >
                      Submit Bid
                    </button>

                    {/* Cancel Button */}
                    <button type="button" className="btn btn-outline">
                      Cancel
                    </button>
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
      {/* Products see here */}
      <div>
        <div className="mt-10 max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">
            Bids For This Product: {bids.length}
          </h1>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Buyer Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Contact</th>
                  <th className="px-4 py-2 border">Profile Image</th>
                  <th className="px-4 py-2 border">Bid Price (৳)</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((data, index) => (
                  <tr key={data._id} className="text-center">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{data.buyer_name}</td>
                    <td className="px-4 py-2 border">{data.buyer_email}</td>
                    <td className="px-4 py-2 border">{data.buyer_contact}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={data.buyer_image}
                        alt={data.buyer_name}
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2 border">{data.bid_price}</td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          data.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border flex justify-center gap-2">
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded hover:opacity-80"
                        // onClick={() => handleBidAction(data._id, "confirmed")}
                      >
                        Accept Offer
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:opacity-80"
                        // onClick={() => handleBidAction(data._id, "rejected")}
                      >
                        Reject Offer
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
  );
};

export default ProductDetails;
