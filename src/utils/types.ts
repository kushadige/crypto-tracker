export interface ExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: RateLimit[];
  exchangeFilters: unknown[];
  symbols: SymbolInfo[];
}

interface RateLimit {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
}

export interface SymbolInfo {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  otoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  allowTrailingStop: boolean;
  cancelReplaceAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: Filter[];
  permissions: unknown[];
  permissionSets: string[][];
  defaultSelfTradePreventionMode: string;
  allowedSelfTradePreventionModes: string[];
}

interface Filter {
  filterType: string;
  minPrice?: string;
  maxPrice?: string;
  tickSize?: string;
  minQty?: string;
  maxQty?: string;
  stepSize?: string;
  limit?: number;
  minTrailingAboveDelta?: number;
  maxTrailingAboveDelta?: number;
  minTrailingBelowDelta?: number;
  maxTrailingBelowDelta?: number;
  bidMultiplierUp?: string;
  bidMultiplierDown?: string;
  askMultiplierUp?: string;
  askMultiplierDown?: string;
  avgPriceMins?: number;
  minNotional?: string;
  applyMinToMarket?: boolean;
  maxNotional?: string;
  applyMaxToMarket?: boolean;
  maxNumOrders?: number;
  maxNumAlgoOrders?: number;
}

export interface Ticker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export interface BinanceAssetResponse {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: AssetData[];
  success: boolean;
}

export interface AssetData {
  id: string;
  assetCode: string;
  assetName: string;
  unit: string;
  commissionRate: number;
  freeAuditWithdrawAmt: number;
  freeUserChargeAmount: number;
  createTime: number;
  test: number;
  gas: number;
  isLegalMoney: boolean;
  reconciliationAmount: number;
  seqNum: string;
  chineseName: string;
  cnLink: string;
  enLink: string;
  logoUrl: string;
  fullLogoUrl: string;
  supportMarket: string | null;
  feeReferenceAsset: string;
  feeRate: number | null;
  feeDigit: number | null;
  assetDigit: number;
  trading: boolean;
  tags: string[];
  plateType: string;
  etf: boolean;
  isLedgerOnly: boolean;
  delisted: boolean;
  preDelist: boolean;
  pdTradeDeadline: string | null;
  pdDepositDeadline: string | null;
  pdAnnounceUrl: string | null;
  tagBits: string;
}

export type KlineArray = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Unused field, ignore.
];

export type KlineResponse = KlineArray[];

export interface CryptoTableData {
  crypto: {
    assetName: string;
    icon: string;
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
  };
  lastPrice: string;
  priceChange24h: string;
  priceChangePercent24h: string;
  chartData: KlineResponse;
}
