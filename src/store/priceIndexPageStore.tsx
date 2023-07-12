// store/store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CURRENCY = "USD" | "GBP" | "EUR";

interface PrinceIndexPageStore {
  usdToggled: boolean;
  gbpToggled: boolean;
  eurToggled: boolean;

  setCurrencyToggled: (currency: CURRENCY, value: boolean) => void;

  refreshInterval: number;

  setRefreshInterval: (value: number) => void;
}

// create persisted localStorage store
export const usePriceIndexPageStore = create<PrinceIndexPageStore>()(
  persist(
    (set, get) => ({
      usdToggled: true,
      gbpToggled: true,
      eurToggled: true,

      setCurrencyToggled: (currency: CURRENCY, value: boolean) => {
        switch (currency) {
          case "USD":
            set({ usdToggled: value });
            break;
          case "GBP":
            set({ gbpToggled: value });
            break;
          case "EUR":
            set({ eurToggled: value });
            break;
        }
      },

      refreshInterval: 5000,

      setRefreshInterval: (value: number) => set({ refreshInterval: value }),
    }),
    {
      name: "priceIndexPageStore", // name of the item in the storage (must be unique)
    }
  )
);

export default usePriceIndexPageStore;
