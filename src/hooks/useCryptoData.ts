"use client";

import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { ApiService } from "@/services/api.service";

import { type CryptoTableData } from "@/utils/types";

const INTERVAL_MS = 10000; // 10 seconds

export const useCryptoData = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["crypto-currency-assets"],
        queryFn: ApiService.getAllAssets,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["crypto-currency-exchange-info"],
        queryFn: ApiService.getExchangeInfo,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["crypto-currency-tickers"],
        queryFn: ApiService.get24hrTickerPriceChangeStatistics,
        refetchIntervalInBackground: true,
        refetchInterval: INTERVAL_MS,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const isLoading = queries.some((query) => query.isPending);
  const isError = queries.some((query) => query.error !== null);
  const error = queries.find((query) => query.error)?.error || null;

  const assetsData = queries[0].data;
  const exchangeInfoData = queries[1].data;
  const tickersData = queries[2].data;

  const usdtFilteredSymbols = useMemo(() => {
    if (!exchangeInfoData) {
      return [];
    }
    return exchangeInfoData.symbols.filter((symbol) => symbol.quoteAsset === "USDT");
  }, [exchangeInfoData]);

  const usdtSymbolAssetPairs = useMemo(() => {
    if (!usdtFilteredSymbols || !assetsData) {
      return [];
    }
    return usdtFilteredSymbols
      .map((symbolInfo) => {
        const asset = assetsData.find((asset) => asset.assetCode === symbolInfo.baseAsset);
        if (!asset) {
          return null;
        }
        return {
          assetName: asset.assetName,
          icon: asset.logoUrl,
          symbol: symbolInfo.symbol,
          baseAsset: symbolInfo.baseAsset,
          quoteAsset: symbolInfo.quoteAsset,
        };
      })
      .filter((item) => item !== null);
  }, [assetsData, usdtFilteredSymbols]);

  const cryptoTableData: CryptoTableData[] = useMemo(() => {
    if (!tickersData || !usdtSymbolAssetPairs) {
      return [];
    }
    return usdtSymbolAssetPairs
      .map((symbolAssetPair) => {
        const ticker = tickersData.find((ticker) => ticker.symbol === symbolAssetPair.symbol);

        if (!ticker || !+ticker.lastPrice) {
          return null;
        }

        return {
          crypto: {
            symbol: symbolAssetPair.symbol,
            assetName: symbolAssetPair.assetName,
            baseAsset: symbolAssetPair.baseAsset,
            quoteAsset: symbolAssetPair.quoteAsset,
            icon: symbolAssetPair.icon,
          },
          lastPrice: ticker.lastPrice,
          priceChange24h: ticker.priceChange,
          priceChangePercent24h: ticker.priceChangePercent,
          chartData: [],
        };
      })
      .filter((item) => item !== null);
  }, [tickersData, usdtSymbolAssetPairs]);

  return { cryptoTableData, isLoading, isError, error };
};
