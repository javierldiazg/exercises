import { PAGES } from "@/utils/constants";

describe("Constants - PAGES", () => {
  it("contains the correct page data", () => {
    expect(PAGES).toEqual([
      {
        title: "Exercise One",
        href: "/exercise1",
        description: "Create a range component with min and max values.",
      },
      {
        title: "Exercise Two",
        href: "/exercise2",
        description: "Create a range component with fixed values.",
      },
    ]);
  });

  it("has the correct number of pages", () => {
    expect(PAGES.length).toBe(2);
  });
});
