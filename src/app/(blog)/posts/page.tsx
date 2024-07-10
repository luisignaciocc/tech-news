import React, { Fragment } from "react";

interface SearchParams {
  s: string;
}

function SearchPost({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Fragment>
      <div>Buscando... {searchParams.s}</div>
    </Fragment>
  );
}

export default SearchPost;
