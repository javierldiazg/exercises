import { PAGES } from "@/utils/constants";

describe("Constants - PAGES", () => {
  it("contains the correct page data", () => {
    expect(PAGES).toEqual([
      {
        title: "Exercise One",
        href: "/exercise1",
        description: "Range component with min and max values (0 to 100).",
      },
      {
        title: "Exercise Two",
        href: "/exercise2",
        description: "Range component with fixed values.",
      },
      {
        title: "Exercise Three",
        href: "/exercise3",
        description:
          "Range component with min and max values (0 to 100). Mobile friendly.",
      },
    ]);
  });

  it("has the correct number of pages", () => {
    expect(PAGES.length).toBe(3);
  });
});
