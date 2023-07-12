import Head from "next/head";
import { api } from "~/utils/api";
import { PageContainer } from "../components/Page";
import PageLeftBar from "../components/PageLeftBar";
import PageBottomBar from "../components/PageBottomBar";
import useStore from "~/utils/store";
import usePriceIndexPageStore from "~/store/priceIndexPageStore";
import PageTopBar from "~/components/rates/PageTopBar";

export default function PriceIndexPage() {
  const priceIndexPageStore = usePriceIndexPageStore((state) => ({
    eurToggled: state.eurToggled,
    gbpToggled: state.gbpToggled,
    usdToggled: state.usdToggled,
    refreshInterval: state.refreshInterval,
  }));

  if (!priceIndexPageStore) return null;

  const { eurToggled, gbpToggled, usdToggled, refreshInterval } =
    priceIndexPageStore;

  const hello = api.btcPriceIndex.currentPriceIndex.useQuery(undefined, {
    refetchInterval: refreshInterval,
  });

  return (
    <>
      <Head>
        <title>Bitcoin Price Index</title>
        <meta name="description" content="Bitcoin Price Index" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer
        pageBottomBar={<PageBottomBar />}
        pageLeftBar={<PageLeftBar />}
        pageTopBar={<PageTopBar />}
        path="/"
      >
        {hello.isLoading ? (
          "loading"
        ) : hello.isError ? (
          hello.error.message
        ) : (
          <div>
            {eurToggled && (
              <div>
                <div>EUR</div>
              </div>
            )}
            {gbpToggled && (
              <div>
                <div>GBP</div>
              </div>
            )}
            {usdToggled && (
              <div>
                <div>USD</div>
              </div>
            )}
          </div>
        )}
      </PageContainer>
    </>
  );
}
