import {
  SITE_AUTHOR,
  SITE_AUTHOR_URL,
  SITE_DESCRIPTION,
  SITE_SHORT_NAME,
} from "@/lib/metadata";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {SITE_SHORT_NAME}
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {SITE_DESCRIPTION} Hecho por{" "}
        <a
          href={SITE_AUTHOR_URL}
          className="underline hover:text-blue-600 duration-200 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {SITE_AUTHOR}
        </a>
        .
      </h2>
    </section>
  );
}
