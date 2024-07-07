import { useQuery } from "@tanstack/react-query";
import { useKlinesData } from "@/hooks/useKlinesData";
import { renderHook } from "@testing-library/react";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/services/api.service", () => ({
  getKlines: jest.fn(),
}));

jest.mock("axios");

describe("useKlinesData", () => {
  const mockKlinesData = Array(100)
    .fill(null)
    .map((_, index) => [
      index,
      "0",
      "0",
      "0",
      (index + 1).toString(), // closePrice
      "0",
      index,
      "0",
      0,
      "0",
      "0",
      "0",
    ]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns processed data on success", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockKlinesData,
      isPending: false,
      error: null,
    });

    const { result } = renderHook(() => useKlinesData("BTCUSDT"));

    expect(result.current.klines.length).toBe(96);
    expect(result.current.klines[0]).toBe(5);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("handles loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isPending: true,
      error: null,
    });

    const { result } = renderHook(() => useKlinesData("BTCUSDT"));

    expect(result.current.isLoading).toBe(true);
  });

  it("handles error state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isPending: false,
      error: new Error("API error"),
    });

    const { result } = renderHook(() => useKlinesData("BTCUSDT"));

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(new Error("API error"));
  });
});
