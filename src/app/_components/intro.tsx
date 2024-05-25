export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        NotiTec.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Un noticiero digital de tecnología con contenido generado
        automáticamente. Hecho por{" "}
        <a
          href="https://www.bocono-labs.com/"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          Bocono-Labs
        </a>
        .
      </h4>
    </section>
  );
}
