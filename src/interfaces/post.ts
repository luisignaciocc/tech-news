// import { type Author } from "./author";

// export type Post = {
//   slug: string;
//   title: string;
//   date: string;
//   coverImage: string;
//   author: Author;
//   excerpt: string;
//   ogImage: {
//     url: string;
//   };
//   content: string;
//   preview?: boolean;
// };

export interface Post {
  id: string;
  title: string;
  date: string;
  slug: string;
  author: {
    name: string;
    picture: string;
  };
  coverImage: string;
  excerpt: string;
}
