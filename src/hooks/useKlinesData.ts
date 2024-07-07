"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api.service";

import { type KlineResponse } from "@/utils/types";

const processKlineData = (data: KlineResponse) => {
  // filter last 96 klines (24 hours)
  const last24hData = data.slice(-96);

  // return close prices
  return last24hData.map((kline) => {
    const [
      _openTime,
      _openPrice,
      _highPrice,
      _lowPrice,
      closePrice,
      _volume,
      _closeTime,
      _quoteAssetVolume,
      _numberOfTrades,
      _takerBuyBaseAssetVolume,
      _takerBuyQuoteAssetVolume,
      _unusedField,
    ] = kline;

    return parseFloat(closePrice);
  });
};

export const useKlinesData = (symbol: string, interval: string = "15m", intervalMs: number = 900000) => {
  const {
    data: klinesData,
    isPending: klinesPending,
    error: klinesError,
  } = useQuery({
    queryKey: ["crypto-currency-klines", symbol, interval],
    queryFn: () => ApiService.getKlines(symbol.toUpperCase(), interval),
    refetchIntervalInBackground: true,
    refetchInterval: intervalMs,
    refetchOnWindowFocus: false,
  });

  const processedData = useMemo(() => {
    if (!klinesData) {
      return [];
    }
    return processKlineData(klinesData);
  }, [klinesData]);

  return {
    klines: processedData,
    isLoading: klinesPending,
    isError: !!klinesError,
    error: klinesError,
  };
};
