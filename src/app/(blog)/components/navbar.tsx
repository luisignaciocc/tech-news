import Link from "next/link";
import React from "react";
import { BsSearch } from "react-icons/bs";

function NavBar() {
  return (
    <nav className="bg-[#333] shadow-[0_4px_12px_rgba(0,0,0,0.5)] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <a
              href="/"
              className="text-white hover:text-gray-400 text-xl font-bold"
            >
              Ejemplo de Página
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/categoria1"
              className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase"
            >
              Categoría 1
            </Link>
            <span className="text-white">|</span>
            <Link
              href="/categoria2"
              className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase"
            >
              Categoría 2
            </Link>
            <span className="text-white">|</span>
            <Link
              href="/categoria3"
              className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase"
            >
              Categoría 3
            </Link>
            <span className="text-white">|</span>
            <Link
              href="/categoria4"
              className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase"
            >
              Categoría 4
            </Link>
            <span className="text-white">|</span>
            <Link
              href="/categoria5"
              className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase"
            >
              Categoría 5
            </Link>
            <span className="text-white">|</span>
            <Link
              href="/categoria6"
              className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase"
            >
              Categoría 6
            </Link>
            <span className="text-white">|</span>
            <button className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase">
              <BsSearch className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
