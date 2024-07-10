import Image from "next/image";
import React from "react";

interface SearchParams {
  s: string;
}

function SearchPost({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="mt-28 mx-8 mb-24 xl:mx-28">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-2">
          <Image
            src="/icon.png"
            width="100"
            height="100"
            alt="Logotipo de Tecnobuc"
            className="w-[80px] h-[80px] object-cover"
          />
        </div>
        <span className="uppercase text-4xl mt-4 flex items-center">
          <span className="hidden md:inline-block mr-2">Buscando</span>
          <span>{`"${searchParams.s}"`}</span>
          <span className="hidden md:inline-block ml-1"> : n resultados</span>
        </span>
      </div>
      <div className="flex gap-4 mt-6">
        <div className="w-full lg:w-8/12 bg-black mt-6 lg:mt-14">
          <p className="text-white">Columna 1</p>
        </div>
        <div className="w-4/12 bg-black hidden lg:block">
          <p className="text-white">Columna 2</p>
        </div>
      </div>
    </div>
  );
}

export default SearchPost;
