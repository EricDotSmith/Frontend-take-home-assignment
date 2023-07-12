import React from "react";
import usePriceIndexPageStore from "~/store/priceIndexPageStore";
import { BitcoinPriceIndex, RATE } from "~/server/types";

interface RateCardsProps {
  data: BitcoinPriceIndex;
}

const RateCards: React.FC<RateCardsProps> = (props) => {
  const { data } = props;

  const priceIndexPageStore = usePriceIndexPageStore((state) => ({
    eurToggled: state.eurToggled,
    gbpToggled: state.gbpToggled,
    usdToggled: state.usdToggled,
  }));

  if (!priceIndexPageStore) return null;

  const { eurToggled, gbpToggled, usdToggled } = priceIndexPageStore;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-3 xl:gap-x-4"
    >
      {usdToggled && <RateCard rate={data.bpi.USD} />}
      {gbpToggled && <RateCard rate={data.bpi.GBP} />}
      {eurToggled && <RateCard rate={data.bpi.EUR} />}
    </ul>
  );
};

interface RateCardProps {
  rate: RATE;
}

const CURRENCY_SYMBOLS = {
  USD: "$",
  GBP: "£",
  EUR: "€",
};

const RateCard: React.FC<RateCardProps> = (props) => {
  const { rate } = props;

  return (
    <li className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="text-sm font-medium leading-6 text-gray-900">
          {rate.description} ({rate.code})
        </div>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Current Bitcoin Price</dt>
          <dd className="text-gray-700">
            {CURRENCY_SYMBOLS[rate.code as keyof typeof CURRENCY_SYMBOLS]}
            {rate.rate}
          </dd>
        </div>
      </dl>
    </li>
  );
};

export default RateCards;
