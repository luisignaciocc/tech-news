import React from "react";

interface SearchParams {
  s: string;
}

function SearchPost({ searchParams }: { searchParams: SearchParams }) {
  return <div>Buscando... {searchParams.s}</div>;
}

export default SearchPost;
