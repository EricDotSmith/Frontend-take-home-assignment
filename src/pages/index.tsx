import Head from "next/head";
import { api } from "~/utils/api";
import { PageContainer } from "../components/Page";
import PageLeftBar from "../components/PageLeftBar";
import PageBottomBar from "../components/PageBottomBar";

export default function Home() {
  const hello = api.btcPriceIndex.currentPriceIndex.useQuery(undefined, {
    // refetchInterval: 1000,
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
        pageTopBar={<>top</>}
        path="/"
      >
        {hello.isLoading ? (
          "loading"
        ) : hello.isError ? (
          hello.error.message
        ) : (
          <div>{hello.data?.bpi.USD.rate}</div>
        )}
      </PageContainer>
    </>
  );
}
