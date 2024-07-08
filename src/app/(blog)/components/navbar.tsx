import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsSearch } from "react-icons/bs";

import { getMostUsedTags } from "@/lib/api";

async function NavBar() {
  const tags = await getMostUsedTags();

  return (
    <nav className="bg-[#333] shadow-[0_4px_12px_rgba(0,0,0,0.5)] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex items-center space-x-1">
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
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
