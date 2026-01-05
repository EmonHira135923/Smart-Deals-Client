import React, { useState } from "react";
import {
  Upload,
  DollarSign,
  Phone,
  MapPin,
  Package,
  Mail,
  Calendar,
  User,
  Image,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Baseurl from "../utils/Baseurl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Createproduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price_min: "",
    price_max: "",
    condition: "Brand New",
    usage: "",
    image: "",
    seller_name: "",
    seller_email: "",
    seller_contact: "",
    seller_image: "",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      "title",
      "category",
      "price_min",
      "price_max",
      "condition",
      "image",
      "seller_name",
      "seller_email",
      "seller_contact",
      "location",
      "description",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `This field is required`;
      }
    });

    // Email validation
    if (
      formData.seller_email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.seller_email)
    ) {
      newErrors.seller_email = "Please enter a valid email address";
    }

    // Phone validation (simple check)
    if (
      formData.seller_contact &&
      !/^[0-9+\-\s()]+$/.test(formData.seller_contact)
    ) {
      newErrors.seller_contact = "Please enter a valid phone number";
    }

    // Price validation
    if (formData.price_min && formData.price_max) {
      const minPrice = parseInt(formData.price_min);
      const maxPrice = parseInt(formData.price_max);

      if (minPrice < 0) {
        newErrors.price_min = "Price cannot be negative";
      }
      if (maxPrice < 0) {
        newErrors.price_max = "Price cannot be negative";
      }
      if (minPrice > maxPrice) {
        newErrors.price_min =
          "Minimum price cannot be greater than maximum price";
        newErrors.price_max = "Maximum price cannot be less than minimum price";
      }
    }

    // URL validation for images
    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = "Please enter a valid image URL";
    }
    if (formData.seller_image && !isValidUrl(formData.seller_image)) {
      newErrors.seller_image = "Please enter a valid image URL";
    }

    // Usage validation
    if (
      formData.usage &&
      (parseInt(formData.usage) < 0 || parseInt(formData.usage) > 1200)
    ) {
      newErrors.usage = "Usage time must be between 0 and 1200 months";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle form submission
  const handleformcreateproduct = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    // Prepare data for submission
    const productData = {
      ...formData,
      price_min: parseInt(formData.price_min),
      price_max: parseInt(formData.price_max),
      usage: formData.usage ? parseInt(formData.usage) : 0,
      status: "available",
      created_at: new Date().toISOString(),
      bids: [],
      rating: 0,
      review_count: 0,
    };

    try {
      const response = await fetch(`${Baseurl}/create-products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Product created successfully!");

        // Reset form
        setFormData({
          title: "",
          category: "",
          price_min: "",
          price_max: "",
          condition: "Brand New",
          usage: "",
          image: "",
          seller_name: "",
          seller_email: "",
          seller_contact: "",
          seller_image: "",
          location: "",
          description: "",
        });

        // Navigate to product page or all products
        if (data._id) {
          setTimeout(() => {
            navigate(`/product/${data._id}`);
          }, 2000);
        }
      } else {
        throw new Error(data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(
        error.message || "Failed to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Category options
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Vehicles",
    "Books & Education",
    "Sports & Fitness",
    "Real Estate",
    "Jobs & Services",
    "Others",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Create A Product
          </h1>
          <p className="text-gray-600">
            List your product for sale on our marketplace
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleformcreateproduct} noValidate>
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter product title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            {/* Min Price & Max Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Minimum Price Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Minimum Price (৳) *
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">৳</span>
                  </div>
                  <input
                    type="number"
                    name="price_min"
                    value={formData.price_min}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.price_min ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="1500"
                  />
                </div>
                {errors.price_min && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.price_min}
                  </p>
                )}
              </div>

              {/* Maximum Price Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Maximum Price (৳) *
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">৳</span>
                  </div>
                  <input
                    type="number"
                    name="price_max"
                    value={formData.price_max}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.price_max ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="2000"
                  />
                </div>
                {errors.price_max && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.price_max}
                  </p>
                )}
              </div>
            </div>

            {/* Product Condition & Usage Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Product Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Condition *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="condition"
                      value="Brand New"
                      checked={formData.condition === "Brand New"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Brand New</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="condition"
                      value="Used"
                      checked={formData.condition === "Used"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Used</span>
                  </label>
                </div>
                {errors.condition && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.condition}
                  </p>
                )}
              </div>

              {/* Product Usage Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Product Usage Time (Months)
                  </span>
                </label>
                <input
                  type="number"
                  name="usage"
                  value={formData.usage}
                  onChange={handleInputChange}
                  min="0"
                  max="1200"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.usage ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="3"
                />
                {errors.usage && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.usage}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty or 0 for new products
                </p>
              </div>
            </div>

            {/* Product Image URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  <Image className="w-4 h-4 mr-1" />
                  Product Image URL *
                </span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://example.com/products/product_image.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.image}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Upload to image hosting service and paste URL here
              </p>
            </div>

            {/* Seller Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Seller Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Seller Name *
                  </span>
                </label>
                <input
                  type="text"
                  name="seller_name"
                  value={formData.seller_name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.seller_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
                {errors.seller_name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.seller_name}
                  </p>
                )}
              </div>

              {/* Seller Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Seller Email *
                  </span>
                </label>
                <input
                  type="email"
                  name="seller_email"
                  value={formData.seller_email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.seller_email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="seller@example.com"
                />
                {errors.seller_email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.seller_email}
                  </p>
                )}
              </div>

              {/* Seller Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Seller Contact *
                  </span>
                </label>
                <input
                  type="tel"
                  name="seller_contact"
                  value={formData.seller_contact}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.seller_contact ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+880 1234 567890"
                />
                {errors.seller_contact && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.seller_contact}
                  </p>
                )}
              </div>
            </div>

            {/* Seller Image URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  <Upload className="w-4 h-4 mr-1" />
                  Seller Profile Image URL
                </span>
              </label>
              <input
                type="url"
                name="seller_image"
                value={formData.seller_image}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.seller_image ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://example.com/profile.jpg"
              />
              {errors.seller_image && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.seller_image}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Optional. Will use default avatar if empty
              </p>
            </div>

            {/* Location Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location *
                </span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="City, Country"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.location}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description *
              </label>
              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your product in detail. Include features, condition, reason for selling, etc."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Be detailed and honest for better responses
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Form Preview (Optional) */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Product Preview</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Title:</span>{" "}
                  {formData.title || "Not provided"}
                </div>
                <div>
                  <span className="font-medium">Price Range:</span> ৳
                  {formData.price_min || "0"} - ৳{formData.price_max || "0"}
                </div>
                <div>
                  <span className="font-medium">Condition:</span>{" "}
                  {formData.condition}
                </div>
                <div>
                  <span className="font-medium">Location:</span>{" "}
                  {formData.location || "Not provided"}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Product...
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5" />
                    Create Product
                  </>
                )}
              </button>

              <p className="mt-4 text-sm text-gray-500">
                By creating a product, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800 mb-1">
                Tips for Success
              </div>
              <div className="text-gray-600">
                Use clear, high-quality photos
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800 mb-1">Be Honest</div>
              <div className="text-gray-600">
                Accurately describe condition and features
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800 mb-1">Price Fairly</div>
              <div className="text-gray-600">
                Research similar products for pricing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createproduct;
