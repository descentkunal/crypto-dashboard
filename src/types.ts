// Interface representing a cryptocurrency object
export interface CryptoCurrency {
  id: string; // Unique identifier for the cryptocurrency
  symbol: string; // Symbol of the cryptocurrency (e.g., BTC for Bitcoin)
  name: string; // Name of the cryptocurrency
  marketCapUsd: string; // Market capitalization in USD
  priceUsd: string; // Current price in USD
}
