import { render, screen } from "@testing-library/react";
import { PAGES } from "@/utils/constants";
import Header from "@/components/Header/Header";

describe("Header Component", () => {
  it("renders the header and navigation", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("renders links from PAGES constant", () => {
    render(<Header />);

    PAGES.forEach((page) => {
      expect(screen.getByRole("link", { name: page.title })).toHaveAttribute(
        "href",
        page.href
      );
    });
  });
});
