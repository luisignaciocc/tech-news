"use client";
import React, { Fragment, useEffect, useState } from "react";

import NavBar from "./navbar";

interface DashboardNavBarProps {
  tags: string[];
}

const DashboardNavBar = ({ tags }: DashboardNavBarProps) => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

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
        <nav
          className={"bg-primary shadow-2xl fixed top-0 left-0 right-0 z-50"}
        >
          <NavBar
            isNavBar={true}
            tags={tags}
            bgLinksColor="text-white"
            hoverLinksColor="hover:text-gray-400"
            socialMediaColor="white"
          />
        </nav>
      </nav>
      <div className="w-full mr-5 ml-3">
        <NavBar
          isNavBar={false}
          tags={tags}
          bgLinksColor="text-black"
          hoverLinksColor="hover:text-red-400"
          socialMediaColor="black"
        />
      </div>
    </Fragment>
  );
};

export default DashboardNavBar;
