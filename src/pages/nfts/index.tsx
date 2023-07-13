import Head from "next/head";
import { PageContainer } from "~/components/Page";
import PageBottomBar from "~/components/PageBottomBar";
import PageLeftBar from "~/components/PageLeftBar";
import { useAccount } from "wagmi";
import NftPageContent from "~/components/nfts/NftPageContent";
import NoSsrWrapper from "~/components/NoSsrWrapper";
import PageTopBar from "~/components/nfts/PageTopBar";

export default function NftPage() {
  const { address } = useAccount();

  return (
    <>
      <Head>
        <title>NFTS</title>
        <meta name="description" content="Show nfts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer
        pageBottomBar={<PageBottomBar />}
        pageLeftBar={<PageLeftBar />}
        pageTopBar={<PageTopBar />}
        path="/"
      >
        <NoSsrWrapper>
          {!address ? (
            <div>Please connect a wallet to continue</div>
          ) : (
            <NftPageContent address={address} />
          )}
        </NoSsrWrapper>
      </PageContainer>
    </>
  );
}
