import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Package,
  ShoppingCart,
  PlusCircle,
  Award,
  LogIn,
  UserPlus,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logoutwithemailandpassword, loading } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // handle logout
  const handlelogout = () => {
    logoutwithemailandpassword()
      .then((result) => {
        toast.success("Logout Succesfully", result);
      })
      .catch((err) => toast.error("Error Found", err.message));
  };

  // Active class for NavLinks
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-purple-700 font-semibold border-b-2 border-purple-600"
      : "text-gray-600 hover:text-purple-600 transition-colors duration-200";

  // Nav items
  const PublicItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Products", path: "/all-product", icon: <Package size={18} /> },
  ];

  const privateitems = [
    {
      name: "My Items",
      path: "/my-product",
      icon: <ShoppingCart size={18} />,
    },
    { name: "Bids", path: "/my-bids", icon: <Award size={18} /> },
    {
      name: "Create",
      path: "/create-product",
      icon: <PlusCircle size={18} />,
    },
  ];

  const navItems = () => {
    if (user) {
      return [...PublicItems, ...privateitems];
    }
    return PublicItems;
  };

  // Loading state
  if (loading) {
    return <NavbarSkeleton />;
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/90 backdrop-blur-sm shadow-sm border-gray-200"
          : "bg-white border-gray-100"
      }`}
    >
      {/* Rest of your Navbar code remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 mr-2 text-gray-600 hover:text-purple-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <NavLink
              to="/"
              className="flex items-center space-x-2 hover:opacity-90"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SD</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-gray-800">Smart</span>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Deals
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems().map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-1.5 px-3 py-2 text-sm font-medium
                  ${getNavLinkClass({ isActive })}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons - Compact */}
          <div className="flex items-center space-x-2">
            {!user ? (
              <>
                {/* Sign In Button */}
                <NavLink
                  to="/login"
                  className="group flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-purple-600 border border-gray-300 rounded-lg hover:border-purple-400 transition-all duration-200"
                >
                  <LogIn size={16} />
                  <span className="hidden sm:inline">Sign In</span>
                </NavLink>

                {/* Sign Up Button */}
                <NavLink
                  to="/reg"
                  className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                >
                  <UserPlus size={16} />
                  <span className="hidden sm:inline">Sign Up</span>
                </NavLink>
              </>
            ) : (
              <button
                onClick={handlelogout}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
              >
                {" "}
                Logout{" "}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu - More Compact */}
        <div
          className={`md:hidden transition-all duration-200 ease-in-out ${
            isMenuOpen
              ? "max-h-80 opacity-100 py-2"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-2 border-t border-gray-100">
            {navItems().map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg mb-1
                  ${isActive ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-50"}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
              <NavLink
                to="/login"
                className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </NavLink>

              <NavLink
                to="/reg"
                className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg"
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Navbar Skeleton Component
const NavbarSkeleton = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Left side - Logo and mobile button */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button skeleton */}
            <div className="md:hidden w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>

            {/* Logo skeleton */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="hidden sm:flex space-x-1">
                <div className="w-12 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="w-16 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Center - Navigation items skeleton (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-1.5">
                <div className="w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div
                  className="w-16 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              </div>
            ))}
          </div>

          {/* Right side - Auth buttons skeleton */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
              <div className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Mobile menu skeleton (hidden by default) */}
        <div className="md:hidden mt-2">
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2 px-3 py-2">
                <div className="w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div
                  className="w-24 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              </div>
            ))}

            {/* Mobile auth buttons skeleton */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <div className="w-full h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
              <div className="w-full h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
      </div>
    </nav>
  );
};

export default Navbar;
