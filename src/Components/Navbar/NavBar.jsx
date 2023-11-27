import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center border-b border-gray-100 w-full px-4 lg:px-8 py-2">
      <Link to="/">
        <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-serif mb-2 lg:mb-0">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-green-400">
            Social Media
          </span>{" "}
          App
        </div>
      </Link>

      <div className="mt-2 lg:mt-0">
        <UserLinks></UserLinks>
      </div>
    </div>
  );
};

export default Navbar;
