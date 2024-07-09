"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { BsList, BsSearch, BsX } from "react-icons/bs";

interface NavBarProps {
  tags: string[];
}

function NavBar({ tags }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#333] shadow-[0_4px_12px_rgba(0,0,0,0.5)] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-white hover:text-gray-400 text-xl font-bold flex items-center"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center mr-2">
                <Image
                  src="/icon.png"
                  width="50"
                  height="50"
                  alt="Logotipo de Tecnobuc"
                  className="w-[60px] h-[60px] object-cover"
                />
              </div>
              Tecnobuc
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {tags.map((tag, index) => (
              <div key={tag} className="flex items-center">
                <Link
                  href={`/posts/tags/${tag}`}
                  className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase"
                >
                  {tag}
                </Link>
                {index < tags.length - 1 && (
                  <span className="text-white">|</span>
                )}
              </div>
            ))}
            <span className="text-white">|</span>
            <button className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase">
              <BsSearch className="h-6 w-6" />
            </button>
          </div>

          <div
            className={`lg:hidden
              main-content-transition
              transition-transform
              duration-350
              ease-in-out
              ${isMenuOpen ? "-translate-x-[290px]" : "translate-x-0"}
            `}
          >
            <div className="lg:hidden flex items-center">
              <button className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase">
                <BsSearch className="h-6 w-6" />
              </button>
              <span className="text-white">|</span>
              <button
                className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <BsX className="h-6 w-6" />
                ) : (
                  <BsList className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-black fixed top-0 right-0 bottom-0 z-40 w-72 transition-all duration-300 ease-in-out">
          <div className="p-6 flex flex-col space-y-4">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/posts/tags/${tag}`}
                className="text-white hover:text-gray-400 text-sm font-bold uppercase mx-4"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
