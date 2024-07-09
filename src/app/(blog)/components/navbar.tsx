"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { BsList, BsSearch, BsX } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

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
            {/* Logo with title */}
            <div className="hidden md:flex md:ml-4 items-center">
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
          </div>

          {/* Social media icons */}
          {!isMenuOpen && (
            <div className="md:hidden flex items-center justify-between w-full">
              <div className="flex items-center sm:ml-4">
                <div className="flex justify-start gap-4 mt-2 mb-4 sm:block md:block lg:hidden">
                  <div className="flex items-start justify-start sm:space-x-2 space-x-1">
                    <div className="relative group">
                      <Link href={"https://facebook.com"} target="_blank">
                        <div className="absolute inset-0 border border-white rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
                        <div className="bg-transparent rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                          <FaFacebookF className="text-1xl sm:text-2xl text-white transition-color duration-300 group-hover:text-black" />
                        </div>
                      </Link>
                    </div>
                    <div className="relative group">
                      <Link href={"https://instagram.com"} target="_blank">
                        <div className="absolute inset-0 border border-white rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
                        <div className="bg-transparent rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                          <FaInstagram className="text-1xl sm:text-2xl text-white transition-color duration-300 group-hover:text-black" />
                        </div>
                      </Link>
                    </div>
                    <div className="relative group">
                      <Link href={"https://x.com"} target="_blank">
                        <div className="absolute inset-0 border border-white rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
                        <div className="bg-transparent rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                          <FaTwitter className="text-1xl sm:text-2xl text-white transition-color duration-300 group-hover:text-black" />
                        </div>
                      </Link>
                    </div>
                    <div className="relative group">
                      <Link href={"https://linkedin.com"} target="_blank">
                        <div className="absolute inset-0 border border-white rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
                        <div className="bg-transparent rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                          <FaLinkedinIn className="text-1xl sm:text-2xl text-white transition-color duration-300 group-hover:text-black" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Central logo */}
          {!isMenuOpen && (
            <div className="md:hidden w-full ml-1">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center">
                <Image
                  src="/icon.png"
                  width="50"
                  height="50"
                  alt="Logotipo de Tecnobuc"
                  className="w-[60px] h-[60px] object-cover"
                />
              </div>
            </div>
          )}

          {/* Links big screens */}
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

          {/* Button to open mobile menu */}
          <div
            className={`lg:hidden
              main-content-transition
              transition-transform
              duration-350
              ease-in-out
              ${isMenuOpen ? "sm:-translate-x-[290px] -translate-x-[220px]" : "translate-x-0"}
            `}
          >
            <div className="lg:hidden flex items-center">
              <button className="text-white hover:text-gray-400 sm:px-3 px-1 py-2 rounded-md text-sm font-bold uppercase">
                <BsSearch className="h-6 w-6" />
              </button>
              <span className="text-white">|</span>
              <button
                className="text-white hover:text-gray-400 sm:px-3 px-1 py-2 rounded-md text-sm font-bold uppercase"
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="bg-black fixed top-0 right-0 bottom-0 z-40 sm:w-72 w-56">
          <div className="sm:px-6 py-6 flex flex-col space-y-4">
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
