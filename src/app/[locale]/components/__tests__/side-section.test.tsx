import { render, screen } from "@testing-library/react";

import { SITE_AUTHOR_URL } from "@/lib/metadata";

import { MiniFooter } from "../side-section";

describe("Testing MiniFooter Component", () => {
  it("should render social media links and footer content correctly", () => {
    render(<MiniFooter />);

    // Verifica que el texto del noticiero se muestre
    expect(screen.getByText(/Tecnobuc/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Un noticiero digital de tecnología/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Todos los derechos reservados/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument();

    // Verifica que el logotipo se muestre
    const logo = screen.getByAltText(
      /Logotipo de Tecnobuc/i,
    ) as HTMLImageElement; // Especifica que es un HTMLImageElement
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src"); // Verifica que el atributo 'src' exista
    expect(logo.src).toMatch(/url=%2Ficon\.png/); // Verifica que el 'src' contenga la parte codificada

    // Verifica que el enlace al autor se muestre
    const authorLink = screen.getByRole("link", { name: /Bocono Labs/i }); // Busca el enlace directamente
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute(
      "href",
      expect.stringContaining(SITE_AUTHOR_URL),
    );
  });
});
