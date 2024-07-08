import Link from "next/link";
import React, { Fragment } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function SocialMediaButtons() {
  return (
    <Fragment>
      {/* Version for large screens */}
      <div className="hidden sm:hidden md:hidden lg:block absolute left-52 top-96 mt-80 flex flex-col gap-4 items-end z-10">
        <div className="flex flex-col gap-4">
          <div className="relative group">
            <Link href={"https://facebook.com"} target="_blank">
              <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
              <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                <FaFacebookF className="text-1xl text-gray-500 transition-color duration-300 group-hover:text-black" />
              </div>
            </Link>
          </div>
          <div className="relative group">
            <Link href={"https://instagram.com"} target="_blank">
              <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
              <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                <FaInstagram className="text-1xl text-gray-500 transition-color duration-300 group-hover:text-black" />
              </div>
            </Link>
          </div>
          <div className="relative group">
            <Link href={"https://x.com"} target="_blank">
              <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
              <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                <FaTwitter className="text-1xl text-gray-500 transition-color duration-300 group-hover:text-black" />
              </div>
            </Link>
          </div>
          <div className="relative group">
            <Link href={"https://linkedin.com"} target="_blank">
              <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
              <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                <FaLinkedinIn className="text-1xl text-gray-500 transition-color duration-300 group-hover:text-black" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Version for small screens */}
      <div className="flex justify-start gap-4 mt-2 mb-4 sm:block md:block lg:hidden">
        <div className="flex items-start justify-start space-x-4">
          <div className="relative group">
            <Link href={"https://facebook.com"} target="_blank">
              <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
              <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                <FaFacebookF className="text-2xl text-gray-500 transition-color duration-300 group-hover:text-black" />
              </div>
            </Link>
          </div>
          <div className="relative group">
            <Link href={"https://instagram.com"} target="_blank">
              <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
              <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                <FaInstagram className="text-2xl text-gray-500 transition-color duration-300 group-hover:text-black" />
              </div>
            </Link>
          </div>
          <div className="relative group">
            <Link href={"https://x.com"} target="_blank">
              <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
              <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                <FaTwitter className="text-2xl text-gray-500 transition-color duration-300 group-hover:text-black" />
              </div>
            </Link>
          </div>
          <div className="relative group">
            <Link href={"https://linkedin.com"} target="_blank">
              <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
              <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                <FaLinkedinIn className="text-2xl text-gray-500 transition-color duration-300 group-hover:text-black" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SocialMediaButtons;
