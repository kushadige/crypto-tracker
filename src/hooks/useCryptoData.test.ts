import { renderHook } from "@testing-library/react";
import { useQueries } from "@tanstack/react-query";
import { useCryptoData } from "./useCryptoData";

jest.mock("@tanstack/react-query", () => ({
  useQueries: jest.fn(),
}));

jest.mock("@/services/api.service");

describe("useCryptoData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sets isLoading to true when queries are pending", () => {
    (
      useQueries as jest.MockedFunction<typeof useQueries> & {
        mockImplementation: Function;
      }
    ).mockImplementation(() => [{ isPending: true }, { isPending: false }, { isPending: false }]);
    const { result } = renderHook(() => useCryptoData());
    expect(result.current.isLoading).toBe(true);
  });

  it("sets isError to true and error correctly when a query fails", () => {
    const mockError = new Error("Test Error");
    (
      useQueries as jest.MockedFunction<typeof useQueries> & {
        mockImplementation: Function;
      }
    ).mockImplementation(() => [{ error: null }, { error: mockError }, { error: null }]);
    const { result } = renderHook(() => useCryptoData());
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(mockError);
  });

  it("populates cryptoTableData correctly on successful data fetch", () => {
    (
      useQueries as jest.MockedFunction<typeof useQueries> & {
        mockImplementation: Function;
      }
    ).mockImplementation(() => [
      { data: [{ assetCode: "BTC", assetName: "Bitcoin", logoUrl: "btc-logo.png" }] },
      { data: { symbols: [{ symbol: "BTCUSDT", baseAsset: "BTC", quoteAsset: "USDT" }] } },
      { data: [{ symbol: "BTCUSDT", lastPrice: "50000", priceChange: "1000", priceChangePercent: "2" }] },
    ]);
    const { result } = renderHook(() => useCryptoData());
    expect(result.current.cryptoTableData).toEqual([
      {
        crypto: {
          symbol: "BTCUSDT",
          assetName: "Bitcoin",
          baseAsset: "BTC",
          quoteAsset: "USDT",
          icon: "btc-logo.png",
        },
        lastPrice: "50000",
        priceChange24h: "1000",
        priceChangePercent24h: "2",
        chartData: [],
      },
    ]);
  });
});
