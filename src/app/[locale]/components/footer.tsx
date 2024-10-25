"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition } from "react";

import Container from "@/components/container";
import { Locale, usePathname, useRouter } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("Footer");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeLanguage = (locale: Locale) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      router.replace(pathname + "?" + params.toString(), { locale });
    });
  };

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <div className="flex flex-row space-x-1 justify-center lg:justify-start">
              <span
                className="font-bold text-primary hover:underline cursor-pointer"
                onClick={() => onChangeLanguage("es")}
              >
                Español
              </span>
              <span className="text-neutral-500">/</span>
              <span
                className="text-primary font-bold hover:underline cursor-pointer"
                onClick={() => onChangeLanguage("en")}
              >
                English
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4">
              {t("description")}
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://www.bocono-labs.com/work/tecnobuc"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3 bg-primary hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              {t("learn-more")}
            </a>
            <a
              href={`https://github.com/luisignaciocc/tech-news`}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3 font-bold hover:underline"
            >
              {t("view-github")}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
