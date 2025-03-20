import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "./layout";

describe("RootLayout Component", () => {
  it("renders the children correctly", () => {
    render(
      <RootLayout>
        <p>Test Content</p>
      </RootLayout>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("has correct HTML structure", () => {
    render(
      <RootLayout>
        <p>Another Content</p>
      </RootLayout>
    );

    expect(document.documentElement.lang).toBe("en");

    expect(screen.getByText("Another Content").parentElement?.tagName).toBe(
      "BODY"
    );
  });
});
