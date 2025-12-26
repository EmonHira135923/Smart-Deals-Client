import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { NavLink } from "react-router";

const Footer = () => {
  const categories = ["Electronics", "Fashion", "Home & Living", "Groceries"];
  const quickLinks = [
    { name: "All Products", path: "/all-product" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/reg" },
  ];

  return (
    <footer className="bg-[#001931] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">SD</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  Smart
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                    Deals
                  </span>
                </h2>
                <p className="text-gray-300 text-sm">
                  Your trusted marketplace
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted marketplace for authentic local products. Discover
              the best deals from across Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <NavLink
                    to={`/category/${category.toLowerCase().replace(" & ", "-").replace(" ", "-")}`}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                    <span>{category}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">
              Contact & Support
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <a
                  href="mailto:support@smartdeals.com"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                >
                  support@smartdeals.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <a
                  href="tel:+880123456789"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                >
                  +880 123 456 789
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Commerce Street, Dhaka, Bangladesh
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Social Links</h4>
              <div className="flex space-x-4">
                <NavLink
                  to="https://facebook.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </NavLink>
                <NavLink
                  to="https://twitter.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </NavLink>
                <NavLink
                  to="https://instagram.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </NavLink>
                <NavLink
                  to="https://linkedin.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 SmartDeals. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <NavLink
                to="/privacy"
                className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms"
                className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/cookies"
                className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
              >
                Cookie Policy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
