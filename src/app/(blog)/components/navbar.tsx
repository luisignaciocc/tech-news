"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { BsList, BsSearch, BsX } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
interface NavBarProps {
  tags: string[];
}

function NavBar({ tags }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isDesktopScreen = useMediaQuery({ minWidth: 1024 });

  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const [inputFocused, setInputFocused] = useState(false);

  const handleSearch = () => {
    if (searchValue) {
      router.push(`/posts?s=${searchValue}`);
      setSearchValue("");
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (isDesktopScreen) {
      setIsMenuOpen(false);
    }
  }, [isDesktopScreen]);

  return (
    <Fragment>
      <nav
        className={
          "bg-[#333] shadow-[0_4px_12px_rgba(0,0,0,0.5)] fixed top-0 left-0 right-0 z-50"
        }
      >
        {/* Search box */}
        {isSearchOpen && (
          <div className="bg-[#333] w-full overflow-hidden transition-all duration-300 ease-in-out">
            <div className="h-14 flex items-center px-4 justify-between">
              <input
                type="text"
                className="w-full h-8 px-2 text-white bg-[#333] focus:outline-none"
                placeholder="Buscar..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus={inputFocused}
              />
              <button
                className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold uppercase"
                onClick={handleSearch}
              >
                <BsSearch className="h-6 w-6" />
              </button>
            </div>
            <hr className="bg-white" />
          </div>
        )}

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
                {isSearchOpen ? (
                  <BsX
                    className="h-10 w-10 cursor-pointer"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSearchOpen((prevState) => !prevState);
                    }}
                  />
                ) : (
                  <BsSearch
                    className="h-6 w-6"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSearchOpen((prevState) => !prevState);
                      setInputFocused(true);
                    }}
                  />
                )}
              </button>
            </div>

            {/* Button to open mobile menu */}
            <div
              className={`lg:hidden
              main-content-transition
              transition-transform
              duration-350
              ease-in-out
              ${isMenuOpen ? "sm:-translate-x-[290px] -translate-x-[240px]" : "translate-x-0"}
            `}
            >
              <div className="lg:hidden flex items-center">
                <button className="text-white hover:text-gray-400 sm:px-3 px-2 py-2 rounded-md text-sm font-bold uppercase">
                  {isSearchOpen ? (
                    <BsX
                      className="h-10 w-10 cursor-pointer"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSearchOpen((prevState) => !prevState);
                      }}
                    />
                  ) : (
                    <BsSearch
                      className="h-6 w-6"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSearchOpen((prevState) => !prevState);
                        setInputFocused(true);
                      }}
                    />
                  )}
                </button>
                <span className="text-white">|</span>
                <button
                  className="text-white hover:text-gray-400 sm:px-3 px-2 py-2 rounded-md text-sm font-bold uppercase"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <BsX className="h-10 w-10" />
                  ) : (
                    <BsList className="h-8 w-8" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="bg-black fixed top-0 right-0 bottom-0 z-40 sm:w-72 w-60 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center mt-6 mb-8">
              <Image
                src="/icon.png"
                width="100"
                height="100"
                alt="Logotipo de Tecnobuc"
                className="w-[100px] h-[100px] object-cover"
              />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <div className="w-full border-t border-gray-500"></div>
              {tags.map((tag, index) => (
                <React.Fragment key={tag}>
                  <div className="sm:px-6 px-3">
                    <Link
                      href={`/posts/tags/${tag}`}
                      className="text-white hover:text-gray-500 text-sm font-bold uppercase w-full block"
                    >
                      {tag}
                    </Link>
                  </div>
                  {index < tags.length - 1 && (
                    <div className="w-full border-b border-gray-500"></div>
                  )}
                </React.Fragment>
              ))}
              <div className="w-full border-b border-gray-500"></div>
            </div>
          </div>
        )}
      </nav>
    </Fragment>
  );
}

export default NavBar;
