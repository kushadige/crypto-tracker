import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "@/config";

import { type BinanceAssetResponse, type ExchangeInfo, type KlineResponse, type Ticker } from "../utils/types";

export class ApiService {
  /**
   * static method to get exchange info
   * docs: https://binance-docs.github.io/apidocs/spot/en/#exchange-information
   *
   * @returns Promise<ExchangeInfo> exchange info
   */
  static async getExchangeInfo() {
    try {
      const { data } = await axios.get<ExchangeInfo>(`${BASE_API_URL}/api/v3/exchangeInfo`);
      return data;
    } catch (err) {
      const error = err as AxiosError<string>;
      throw new Error(error.message);
    }
  }

  /**
   * static method to get 24hr ticker price change statistics
   * docs: https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics
   *
   * @returns Promise<Ticker[]> 24hr ticker price change statistics
   */
  static async get24hrTickerPriceChangeStatistics() {
    try {
      const { data } = await axios.get<Array<Ticker>>(`${BASE_API_URL}/api/v3/ticker/24hr`);
      return data;
    } catch (err) {
      const error = err as AxiosError<string>;
      throw new Error(error.message);
    }
  }

  /**
   * static method to get all assets available on binance including name, symbol, logo, etc.
   *
   * @returns Promise<any> all assets
   */
  static async getAllAssets() {
    try {
      const { data } = await axios.get<BinanceAssetResponse>(
        "https://www.binance.com/bapi/asset/v2/public/asset/asset/get-all-asset"
      );
      return data.data;
    } catch (err) {
      const error = err as AxiosError<string>;
      throw new Error(error.message);
    }
  }

  /**
   * static method to get klines for a given symbol
   * docs: https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data
   *
   * @param symbol - symbol of the asset
   * @returns Promise<Array<KlineResponse>> klines
   */
  static async getKlines(symbol: string, interval: string = "15m") {
    try {
      const { data } = await axios.get<KlineResponse>(
        `${BASE_API_URL}/api/v3/klines?symbol=${symbol}&interval=${interval}`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<string>;
      throw new Error(error.message);
    }
  }
}
