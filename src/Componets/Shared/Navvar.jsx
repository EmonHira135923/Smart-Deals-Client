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
import { NavLink, useNavigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Active class for NavLinks
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
      : "text-gray-700 hover:bg-gray-100 hover:text-purple-700";

  // Nav items
  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "All Products", path: "/all-product", icon: <Package size={20} /> },
    {
      name: "My Products",
      path: "/my-product",
      icon: <ShoppingCart size={20} />,
    },
    { name: "My Bids", path: "/my-bids", icon: <Award size={20} /> },
    { name: "Create", path: "/create-product", icon: <PlusCircle size={20} /> },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <NavLink
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition-opacity"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">SD</span>
              </div>
              <span className="hidden sm:block">
                Smart
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Deals
                </span>
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
                  ${getNavLinkClass({ isActive })}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Sign In / Sign Up Buttons */}
          <div className="flex items-center space-x-3">
            {/* Login Button */}
            <NavLink
              to="/login"
              className="group flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-purple-300"
            >
              <LogIn size={20} className="group-hover:text-purple-600" />
              <span className="hidden sm:inline">Sign In</span>
            </NavLink>

            {/* Register Button */}
            <NavLink
              to="/reg"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <UserPlus size={20} />
              <span className="hidden sm:inline">Sign Up</span>
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="py-4 border-t border-gray-100">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200
                  ${getNavLinkClass({ isActive })}
                `}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <NavLink
                to="/login"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <LogIn size={20} />
                <span>Sign In</span>
              </NavLink>

              <NavLink
                to="/reg"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
              >
                <UserPlus size={20} />
                <span>Sign Up</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
