import usePriceIndexPageStore from "~/store/priceIndexPageStore";
import Toggle from "../Toggle";
import RefreshIntervalList from "../RefreshIntervalList";

const PageTopBar: React.FC = () => {
  const priceIndexPageStore = usePriceIndexPageStore((state) => ({
    eurToggled: state.eurToggled,
    gbpToggled: state.gbpToggled,
    usdToggled: state.usdToggled,

    setCurrencyToggled: state.setCurrencyToggled,

    refreshInterval: state.refreshInterval,
    setRefreshInterval: state.setRefreshInterval,
  }));

  if (!priceIndexPageStore) return null;

  const {
    eurToggled,
    gbpToggled,
    usdToggled,
    setCurrencyToggled,
    refreshInterval,
    setRefreshInterval,
  } = priceIndexPageStore;

  return (
    <div className="flex w-full flex-col items-center space-y-2 bg-white px-4 py-4 shadow-sm  sm:flex-row sm:justify-between sm:space-y-0 sm:py-0">
      <div className="flex space-x-2">
        <Toggle
          enabled={eurToggled}
          setEnabled={() => {
            setCurrencyToggled("EUR", !eurToggled);
          }}
          text="EUR"
        />
        <Toggle
          enabled={gbpToggled}
          setEnabled={() => {
            setCurrencyToggled("GBP", !gbpToggled);
          }}
          text="GBP"
        />
        <Toggle
          enabled={usdToggled}
          setEnabled={() => {
            setCurrencyToggled("USD", !usdToggled);
          }}
          text="USD"
        />
      </div>
      <RefreshIntervalList
        interval={refreshInterval}
        onChange={setRefreshInterval}
      />
    </div>
  );
};

export default PageTopBar;
