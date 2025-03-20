import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getFixedRange } from "@/api/mockService";
import ExerciseTwo from "@/app/exercise2/page";

jest.mock("../../api/mockService", () => ({
  getFixedRange: jest.fn(),
}));

jest.mock("../../components/Header/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Header Mock</div>,
}));

jest.mock("../../components/Range/Range", () => ({
  __esModule: true,
  Range: ({
    min,
    max,
    fixedValues,
  }: {
    min: number;
    max: number;
    fixedValues?: number[];
  }) => (
    <div data-testid="mock-range">
      <span data-testid="min-value">{min}</span>
      <span data-testid="max-value">{max}</span>
      <span data-testid="fixed-values">{JSON.stringify(fixedValues)}</span>
    </div>
  ),
}));

describe("ExerciseTwo Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state initially", () => {
    (getFixedRange as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<ExerciseTwo />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the Range component with data after loading", async () => {
    const mockRangeValues = [10, 20, 30, 40, 50];
    const mockData = { rangeValues: mockRangeValues };
    (getFixedRange as jest.Mock).mockResolvedValue(mockData);

    render(<ExerciseTwo />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("mock-range")).toBeInTheDocument();
    expect(screen.getByTestId("min-value").textContent).toBe("10");
    expect(screen.getByTestId("max-value").textContent).toBe("50");
    expect(screen.getByTestId("fixed-values").textContent).toBe(
      JSON.stringify(mockRangeValues)
    );
  });

  it("calls getFixedRange on component mount", async () => {
    (getFixedRange as jest.Mock).mockResolvedValue({
      rangeValues: [10, 20, 30],
    });

    await act(async () => {
      render(<ExerciseTwo />);
    });

    expect(getFixedRange).toHaveBeenCalledTimes(1);
  });
});
