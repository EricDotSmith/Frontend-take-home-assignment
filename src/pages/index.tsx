import Head from "next/head";
import { api } from "~/utils/api";
import { PageContainer } from "../components/Page";
import PageLeftBar from "../components/PageLeftBar";
import PageBottomBar from "../components/PageBottomBar";
import usePriceIndexPageStore from "~/store/priceIndexPageStore";
import PageTopBar from "~/components/rates/PageTopBar";
import NoSSRWrapper from "~/components/NoSsrWrapper";
import RateCards from "~/components/rates/RateCards";

export default function PriceIndexPage() {
  const priceIndexPageStore = usePriceIndexPageStore((state) => ({
    refreshInterval: state.refreshInterval,
  }));

  if (!priceIndexPageStore) return null;

  const { refreshInterval } = priceIndexPageStore;

  const bitcoinPriceIndexQuery = api.btcPriceIndex.currentPriceIndex.useQuery(
    undefined,
    {
      refetchInterval: refreshInterval,
    }
  );

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
        pageTopBar={
          <NoSSRWrapper>
            <PageTopBar />
          </NoSSRWrapper>
        }
        path="/"
      >
        {bitcoinPriceIndexQuery.isLoading ? (
          "loading"
        ) : bitcoinPriceIndexQuery.isError ? (
          bitcoinPriceIndexQuery.error.message
        ) : (
          <RateCards data={bitcoinPriceIndexQuery.data} />
        )}
      </PageContainer>
    </>
  );
}
