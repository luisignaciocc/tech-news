import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function MiniFooter() {
  return (
    <div className="mt-6">
      <div className="flex justify-center gap-4 mt-2 mb-4">
        <div className="flex items-start justify-center space-x-4">
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

      <div className="flex flex-col justify-center items-center ml-4">
        <span className="uppercase text-sm">
          Tecnobuc -{" "}
          <span className="text-gray-700">
            Un noticiero digital de tecnología con contenido generado
            automáticamente.
          </span>
        </span>
        <span className="uppercase text-sm text-gray-700">
          Todos los derechos reservados.
        </span>
        <span className="uppercase text-sm text-gray-700">&copy; 2024</span>
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center my-2 ml-2">
          <Image
            src="/icon.png"
            width="50"
            height="50"
            alt="Logotipo de Tecnobuc"
            className="w-[60px] h-[60px] object-cover"
          />
        </div>
        <span className="uppercase text-xs">Hecho por Bocono Labs.</span>
      </div>
    </div>
  );
}

export default MiniFooter;
