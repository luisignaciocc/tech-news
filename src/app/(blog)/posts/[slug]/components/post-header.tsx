import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import { DateFormatter } from "@/components/date-formatter";

import { PostTitle } from "./post-title";

type Props = {
  title: string;
  coverImage: string | null;
  date: Date;
  author: {
    name: string;
    picture: string;
  };
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage || "/api/preview-image"} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter date={date} />
        </div>
      </div>
    </>
  );
}
