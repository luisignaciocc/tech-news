import React from "react";

import { PostCardSkeleton } from "./post-card";
import SocialMediaButtons from "./social-media-buttons";

function PostPageSkeleton() {
  return (
    <main>
      <div className="flex flex-wrap justify-center gap-6 mb-7">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative flex items-center max-w-[280px] mt-9 mr-8"
          >
            <PostCardSkeleton />
            {index < 3 && (
              <div className="absolute right-[-5px] bottom-1 h-24 border-r border-gray-300" />
            )}
          </div>
        ))}
      </div>
      <article className="mb-32 relative">
        <div className="w-full h-[60px] bg-gray-100 mb-8"></div>

        <div className="hidden sm:hidden lg:block">
          <SocialMediaButtons />
        </div>

        <div className="w-[90%] h-full flex flex-col items-Start justify-Start mx-auto md:w-[60%]">
          {/* <PostHeaderSkeleton />
            <PostBodySkeleton />
            {[...Array(3)].map((_, index) => (
              <SimilarPostsSkeleton key={index} />
            ))}
            <MoreTagsSkeleton /> */}
        </div>
      </article>
    </main>
  );
}

export default PostPageSkeleton;
