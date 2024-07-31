"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { BsList, BsSearch, BsX } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";

import { SITE_SHORT_NAME } from "@/lib/metadata";
import { cn } from "@/lib/utils";

import { socialMediaLinks } from "../posts/[slug]/components/social-media-buttons";

interface NavBarProps {
  isNavBar: boolean;
  tags: string[];
  theme?: "light" | "dark";
}

function NavBar({ isNavBar, tags, theme = "light" }: NavBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isDesktopScreen = useMediaQuery({ minWidth: 1024 });

  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const search = searchParams.get("s");
    if (search) {
      setSearchValue(search);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (searchValue) {
      router.push(`/posts?s=${searchValue}`);
    } else {
      router.push("/posts");
    }
    setSearchValue("");
    setIsMenuOpen(false);
    setIsSearchOpen(false);
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
      {/* Search box */}
      {isSearchOpen && (
        <div
          className={cn(
            "bg-transparent w-full overflow-hidden transition-all duration-300 ease-in-out absolute top-0 left-0",
            {
              "bg-white": theme === "light",
              "bg-black": theme === "dark",
            },
          )}
        >
          <div className="h-14 flex items-center px-4 justify-between">
            <input
              type="text"
              className={cn(
                "w-full h-8 px-2 bg-transparent focus:outline-none",
                {
                  "text-black": theme === "light",
                  "text-white": theme === "dark",
                },
              )}
              placeholder="Buscar..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus={inputFocused}
            />
            <button
              className={cn(
                "px-3 py-2 rounded-md text-sm font-bold uppercase",
                {
                  "text-black hover:text-red-400": theme === "light",
                  "text-white hover:text-gray-400": theme === "dark",
                },
              )}
              onClick={handleSearch}
            >
              <BsSearch className="h-6 w-6" />
            </button>
          </div>
          <hr className="border-white" />
        </div>
      )}

      <div
        className={`
          ${isNavBar ? (isSearchOpen ? "mt-14" : "") : "mt-3"}
          max-w-7xl mx-auto transition-all duration-300 ease-in-out
        `}
      >
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            {/* Logo with title */}
            <div className="hidden md:flex md:ml-4 items-center">
              <Link
                href="/"
                className={cn(`hover:text-gray-400 flex items-center`, {
                  "text-white": theme === "dark",
                  "text-black": theme === "light",
                })}
              >
                <div
                  className={`${isNavBar ? "w-10 h-10" : isMenuOpen ? "w-10 h-10" : "w-20 h-20"} rounded-full overflow-hidden flex items-center mr-2 mb-1`}
                >
                  <Image
                    src="/icon.png"
                    width="150"
                    height="150"
                    alt="Logotipo de Tecnobuc"
                    className={`${isNavBar ? "w-14 h-14" : isMenuOpen ? "w-14 h-14" : "w-28 h-28"} object-cover`}
                  />
                </div>
                <h3
                  className={`${isNavBar ? "text-xl font-bold" : isMenuOpen ? "text-xl font-bold" : "text-5xl md:text-7xl tracking-tighter leading-tight md:pr-8"} `}
                >
                  {SITE_SHORT_NAME}
                </h3>
              </Link>
            </div>
          </div>

          {/* Social media icons */}
          {!isMenuOpen && (
            <div className="md:hidden flex items-center justify-between w-full">
              <div className="flex items-center mx-2">
                <div className="flex justify-center lg:hidden">
                  <div className="flex sm:space-x-2 space-x-1">
                    {socialMediaLinks.map((socialMedia, index) => (
                      <div
                        className="relative group"
                        key={`social-media-links-header-${index}`}
                      >
                        <a href={socialMedia.url} target="_blank">
                          <div
                            className={cn(
                              `absolute inset-0 border rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500`,
                              {
                                " border-black": theme === "light",
                                "border-white": theme === "dark",
                              },
                            )}
                          ></div>
                          <div className="bg-transparent rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                            <socialMedia.icon
                              className={cn(
                                `text-1xl sm:text-2xl transition-color duration-300 group-hover:text-black`,
                                {
                                  "text-white": theme === "dark",
                                  "text-black": theme === "light",
                                },
                              )}
                            />
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Central logo */}
          {!isMenuOpen && (
            <div className="md:hidden w-full ml-1">
              <Link href="/">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center">
                  <Image
                    src="/icon.png"
                    width="50"
                    height="50"
                    alt="Logotipo de Tecnobuc"
                    className="w-14 h-14 object-cover"
                  />
                </div>
              </Link>
            </div>
          )}

          {/* Links big screens */}
          <div className="hidden lg:flex items-center space-x-1">
            {tags.map((tag, index) => (
              <div key={tag} className="flex items-center">
                <Link
                  href={`/posts/tags/${encodeURIComponent(tag)}`}
                  className={cn(
                    `px-3 py-2 rounded-md text-sm font-bold uppercase`,
                    {
                      "text-white hover:text-gray-400": theme === "dark",
                      "text-black hover:text-red-400": theme === "light",
                    },
                  )}
                >
                  {tag}
                </Link>
                {index < tags.length - 1 && (
                  <span
                    className={cn({
                      "text-white": theme === "dark",
                      "text-black": theme === "light",
                    })}
                  >
                    |
                  </span>
                )}
              </div>
            ))}
            <span
              className={cn({
                "text-white": theme === "dark",
                "text-black": theme === "light",
              })}
            >
              |
            </span>
            <button
              className={cn(
                "px-3 py-2 rounded-md text-sm font-bold uppercase",
                {
                  "text-white hover:text-gray-400": theme === "dark",
                  "text-black hover:text-red-400": theme === "light",
                },
              )}
            >
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
              ${isMenuOpen ? "sm:-translate-x-72 -translate-x-60" : "translate-x-0"}
            `}
          >
            <div className="lg:hidden flex items-center">
              <button
                className={cn(
                  "sm:px-3 px-2 py-2 rounded-md text-sm font-bold uppercase",
                  {
                    "text-white hover:text-gray-400": theme === "dark",
                    "text-black hover:text-red-400": theme === "light",
                  },
                )}
              >
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
              <span
                className={cn({
                  "text-white": theme === "dark",
                  "text-black": theme === "light",
                })}
              >
                |
              </span>
              <button
                className={cn(
                  "sm:px-3 px-2 py-2 rounded-md text-sm font-bold uppercase",
                  {
                    "text-white hover:text-gray-400": theme === "dark",
                    "text-black hover:text-red-400": theme === "light",
                  },
                )}
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
          <Link href="/">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center mt-6 mb-8">
              <Image
                src="/icon.png"
                width="100"
                height="100"
                alt="Logotipo de Tecnobuc"
                className="w-24 h-24 object-cover"
              />
            </div>
          </Link>
          <div className="flex flex-col space-y-4 w-full">
            <div className="w-full border-t border-gray-500"></div>
            {tags.map((tag, index) => (
              <React.Fragment key={tag}>
                <div className="sm:px-6 px-3">
                  <Link
                    href={`/posts/tags/${encodeURIComponent(tag)}`}
                    className="text-white hover:text-gray-400 text-sm font-bold uppercase w-full block"
                  >
                    {tag}
                  </Link>
                </div>
                {index < tags.length - 1 && (
                  <div className="w-full border-b border-gray-500"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default NavBar;
