import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PAGES } from "@/utils/constants";
import Home from "@/app/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  ),
}));

jest.mock("../components/Header/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Header Mock</div>,
}));

describe("Home Component", () => {
  it("renders the header", () => {
    render(<Home />);
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
  });

  it("renders all page cards with correct content", () => {
    render(<Home />);

    PAGES.forEach((page) => {
      expect(screen.getByText(page.title)).toBeInTheDocument();
      expect(screen.getByText(page.description)).toBeInTheDocument();
    });
  });

  it("renders links with correct hrefs", () => {
    render(<Home />);

    const links = screen.getAllByTestId("mock-link");
    expect(links).toHaveLength(PAGES.length);

    links.forEach((link, index) => {
      expect(link).toHaveAttribute("href", PAGES[index].href);
    });
  });
});
