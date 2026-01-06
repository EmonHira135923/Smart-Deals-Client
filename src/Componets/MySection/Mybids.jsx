import React, { useEffect, useState } from "react";
import Baseurl from "../utils/Baseurl";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Trash2,
  Eye,
  DollarSign,
  User,
  Mail,
  Phone,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  AlertTriangle,
} from "lucide-react";

const Mybids = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bidToDelete, setBidToDelete] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBids = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${Baseurl}/get-bids?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      // console.log("from", response.headers);
      const data = await response.json();
      setBids(data);
    } catch (error) {
      console.error("Error fetching bids:", error);
      toast.error("Failed to load bids");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchBids();
    }
  }, [user?.email]);

  const handleRemoveClick = (bid) => {
    setBidToDelete(bid);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!bidToDelete) return;

    try {
      const response = await fetch(
        `${Baseurl}/delete-bids/${bidToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setBids(bids.filter((bid) => bid._id !== bidToDelete._id));
        toast.success("Bid removed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to remove bid", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting bid:", error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setShowDeleteModal(false);
      setBidToDelete(null);
    }
  };

  // Filter bids based on status and search term
  const filteredBids = bids.filter((bid) => {
    const matchesStatus =
      selectedStatus === "all" || bid.status === selectedStatus;
    const matchesSearch =
      searchTerm === "" ||
      bid.buyer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.productId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.bid_price?.toString().includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
      case "confirmed":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            {status}
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium flex items-center gap-1">
            <XCircle className="w-4 h-4" />
            {status}
          </span>
        );
      case "pending":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {status}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bids...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bids</h1>
            <p className="text-gray-600">Manage all your placed bids</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Total Bids</p>
            <p className="text-2xl font-bold text-gray-900">{bids.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {bids.filter((b) => b.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Accepted</p>
            <p className="text-2xl font-bold text-green-600">
              {
                bids.filter(
                  (b) => b.status === "accepted" || b.status === "confirmed"
                ).length
              }
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Total Value</p>
            <p className="text-2xl font-bold text-blue-600">
              ৳
              {bids.reduce(
                (sum, bid) => sum + parseFloat(bid.bid_price || 0),
                0
              )}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bids..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="confirmed">Confirmed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-purple-600">
              {filteredBids.length}
            </span>{" "}
            bids
          </p>
        </div>
      </div>

      {/* Bids Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        {filteredBids.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No bids found
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedStatus !== "all"
                ? "Try adjusting your search or filters"
                : "You haven't placed any bids yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    #
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Buyer Info
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Product ID
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Bid Price
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBids.map((bid, index) => (
                  <tr
                    key={bid._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={bid.buyer_image}
                          alt={bid.buyer_name}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(bid.buyer_name)}&background=6366f1&color=fff`;
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {bid.buyer_name}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {bid.buyer_email}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {bid.buyer_contact}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {bid.productId.substring(0, 8)}...
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-lg font-bold text-gray-900">
                          ৳{bid.bid_price}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(bid.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRemoveClick(bid)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Remove Bid"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="View Details"
                          onClick={() =>
                            (window.location.href = `/product/${bid.productId}`)
                          }
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Remove Bid
              </h3>
              <p className="text-gray-600">
                Are you sure you want to remove this bid? This action cannot be
                undone.
              </p>
            </div>

            {bidToDelete && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={bidToDelete.buyer_image}
                    alt={bidToDelete.buyer_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {bidToDelete.buyer_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Bid: ৳{bidToDelete.bid_price}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    Product ID:{" "}
                    <span className="font-mono">{bidToDelete.productId}</span>
                  </p>
                  <p>Status: {getStatusBadge(bidToDelete.status)}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setBidToDelete(null);
                }}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
              >
                Remove Bid
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Mybids;
