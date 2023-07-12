import Head from "next/head";
import { PageContainer } from "~/components/Page";
import PageBottomBar from "~/components/PageBottomBar";
import PageLeftBar from "~/components/PageLeftBar";

export default function Nfts() {
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
        pageTopBar={<>top</>}
        path="/"
      >
        NFTs
      </PageContainer>
    </>
  );
}
