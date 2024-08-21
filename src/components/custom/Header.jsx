import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-gray-800 text-white py-4 px-6 md:px-8 lg:px-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          AlgoVisualizer
        </Link>
        <ul className="flex space-x-6 md:space-x-8 lg:space-x-10">
          <li>
            <Link
              to="/sort"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Sort Algorithms
            </Link>
          </li>
          <li>
            <Link
              to="/graph"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Graph Algorithms
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Header;
