import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBodySkeleton() {
  return (
    <div className="text-gray-600 w-full">
      <h2 className="mb-5">
        <Skeleton count={6} />
      </h2>
      <h2 className="mb-5">
        <Skeleton count={6} />
      </h2>
      <h2 className="mb-5">
        <Skeleton count={6} />
      </h2>
      <h2 className="mb-5">
        <Skeleton count={6} />
      </h2>
    </div>
  );
}

export function PostBody({ content }: Props) {
  return (
    <div className="text-gray-600 w-full">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
