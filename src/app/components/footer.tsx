import Container from "@/components/container";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Automáticamente Generado con Inteligencia Artificial.
          </h1>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://www.bocono-labs.com/work"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Saber más
            </a>
            <a
              href={`https://github.com/luisignaciocc/tech-news`}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3 font-bold hover:underline"
            >
              Ver repo en GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
