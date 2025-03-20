import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getNormalRange } from "@/api/mockService";
import ExerciseOne from "@/app/exercise1/page";

jest.mock("../../api/mockService", () => ({
  getNormalRange: jest.fn(),
}));

jest.mock("../../components/Header/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Header Mock</div>,
}));

jest.mock("../../components/Range/Range", () => ({
  __esModule: true,
  Range: ({ min, max }: { min: number; max: number }) => (
    <div data-testid="mock-range">
      <span data-testid="min-value">{min}</span>
      <span data-testid="max-value">{max}</span>
    </div>
  ),
}));

describe("ExerciseOne Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state initially", () => {
    (getNormalRange as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<ExerciseOne />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the Range component with data after loading", async () => {
    const mockData = { min: 10, max: 100 };
    (getNormalRange as jest.Mock).mockResolvedValue(mockData);

    render(<ExerciseOne />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("mock-range")).toBeInTheDocument();
    expect(screen.getByTestId("min-value").textContent).toBe("10");
    expect(screen.getByTestId("max-value").textContent).toBe("100");
  });

  it("calls getNormalRange on component mount", async () => {
    (getNormalRange as jest.Mock).mockResolvedValue({ min: 0, max: 100 });

    await act(async () => {
      render(<ExerciseOne />);
    });

    expect(getNormalRange).toHaveBeenCalledTimes(1);
  });
});
