export interface BitcoinPriceIndex {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Currencies;
}

export interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface Currencies {
  USD: RATE;
  GBP: RATE;
  EUR: RATE;
}

export interface RATE {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}
