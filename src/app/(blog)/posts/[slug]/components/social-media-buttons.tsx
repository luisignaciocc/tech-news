import React, { Fragment } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const socialMediaLinks = [
  {
    name: "Facebook",
    url: "https://web.facebook.com/profile.php?id=61559704547847",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/tecnobuc/",
    icon: FaInstagram,
  },
  {
    name: "Twitter",
    url: "https://x.com/tecnobuc",
    icon: FaTwitter,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/104021039/admin/feed/posts/",
    icon: FaLinkedinIn,
  },
];

function SocialMediaButtons() {
  return (
    <Fragment>
      {/* Version for large screens */}
      <div className="hidden lg:flex absolute lg:left-8 xl:left-28 top-96 mt-80 flex-col gap-4 items-end z-10">
        <div className="flex flex-col gap-4">
          {socialMediaLinks.map((socialMedia, index) => (
            <div className="relative group" key={`social-media-links-${index}`}>
              <a href={socialMedia.url} target="_blank">
                <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
                <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                  <socialMedia.icon className="text-1xl text-gray-500 transition-color duration-300 group-hover:text-black" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Version for small screens */}
      <div className="flex justify-start gap-4 mt-2 mb-4 lg:hidden">
        <div className="flex items-start justify-start space-x-4">
          {socialMediaLinks.map((socialMedia, index) => (
            <div className="relative group" key={`social-media-links-${index}`}>
              <a href={socialMedia.url} target="_blank">
                <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
                <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                  <socialMedia.icon className="text-2xl text-gray-500 transition-color duration-300 group-hover:text-black" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default SocialMediaButtons;
