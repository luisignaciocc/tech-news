"use client";
import React, { Fragment, useEffect, useState } from "react";

import { getMostUsedTags } from "@/lib/api";

import NavBar from "./navbar";

const NavbarController = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const mostUsedTags = async () => {
      try {
        const data = await getMostUsedTags(6);
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    mostUsedTags();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <nav
        className={`
      fixed top-0 left-0 w-full z-50
      bg-white shadow-md
      transition-all duration-500 ease-in-out
      ${showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
    `}
      >
        <NavBar tags={tags} />
      </nav>
    </Fragment>
  );
};

export default NavbarController;
