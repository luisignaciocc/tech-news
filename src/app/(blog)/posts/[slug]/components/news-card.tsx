import Image from "next/image";
import React from "react";

interface NewsCardProps {
  imageUrl: string | null;
  title: string;
  tags: { id: number; name: string }[];
}

const NewsCard: React.FC<NewsCardProps> = ({ imageUrl, title, tags }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden w-full max-w-[300px]">
      <div className="w-1/3">
        <Image
          src={imageUrl || "https://via.placeholder.com/150x150"}
          alt={title}
          className="w-full h-full object-cover"
          width={200}
          height={200}
        />
      </div>
      <div className="w-2/3 p-2">
        <h3 className="text-base font-bold mb-1 line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-xs line-clamp-2">
          {tags.map((tag) => tag.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
