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
      <div
        className={`
      fixed top-0 left-0 w-full z-50
      bg-white shadow-md
      transition-all duration-500 ease-in-out
      ${showNavbar ? "" : "-translate-y-full"}
    `}
      >
        <div
          className={`bg-primary shadow-2xl right-0 z-50 ${showNavbar ? "" : "hidden"}`}
        >
          <NavBar isNavBar={true} tags={tags} theme="dark" />
        </div>
      </div>
      <div className="w-full mr-5 ml-3">
        <NavBar isNavBar={false} tags={tags} theme="light" />
      </div>
    </Fragment>
  );
};

export default DashboardNavBar;
