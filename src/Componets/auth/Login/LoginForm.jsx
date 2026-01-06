import React, { useState } from "react";
import Navbar from "../../../Componets/Shared/Navvar";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { signinuserwithemailandpassword, loading, signinwithgoogle } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const naviagate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signinuserwithemailandpassword(email, password)
      .then((result) => {
        toast.success("User Created from login Succesfully");
        e.target.reset();
        naviagate(location?.state || "/");
      })
      .catch((err) => {
        toast.error("User not created");
      });
  };
  const handlegooglelogin = () => {
    signinwithgoogle()
      .then((result) => {
        toast.success("Registration Succesfully", result.user);
        console.log("token", result);
        naviagate(location?.state || "/");
      })
      .catch((err) => {
        toast.error("User not created");
      });
  };

  if (loading) {
    return <span className="loading loading-ball loading-xl"></span>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">SD</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your SmartDeals account</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            {/* Google Sign-In Button */}
            <button
              onClick={handlegooglelogin}
              type="button"
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 mb-6"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign in with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <NavLink
                    to="/forgot-password"
                    className="text-sm text-purple-600 hover:text-purple-800 hover:underline"
                  >
                    Forgot password?
                  </NavLink>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Terms */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <NavLink
                to="/reg"
                className="font-semibold text-purple-600 hover:text-purple-800 hover:underline transition-colors"
              >
                Create an account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
