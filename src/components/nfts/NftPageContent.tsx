import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import { useQuery } from "@tanstack/react-query";

const config = {
  apiKey: "zAQ01pjyJ7aIvTiejJFzizfVD45a1Jax",
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(config);

async function fetchNFTs(walletAddress: `0x${string}`) {
  const nfts = await alchemy.nft.getNftsForOwner(walletAddress);

  return nfts;
}

interface NftPageContentProps {
  address: `0x${string}`;
}

const NftPageContent: React.FC<NftPageContentProps> = (props) => {
  const { address } = props;

  const { data, isFetching } = useQuery(["nfts", address], () =>
    fetchNFTs(address)
  );

  return (
    <div>
      {isFetching ? <div>Loading...</div> : null}
      {!!data ? (
        data.ownedNfts.length === 0 ? (
          <div>Sorry, it doesn't look like you own any NFTs</div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {data.ownedNfts.map((nft, i) => (
              <NftCard nft={nft} key={i} />
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
};

interface NftCardProps {
  nft: OwnedNft;
}

const NftCard: React.FC<NftCardProps> = (props) => {
  const { nft } = props;

  return (
    <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
      <div className="flex flex-1 flex-col p-8">
        <img
          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
          src={nft.media[0]?.gateway}
          alt=""
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {nft.contract.name}
        </h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between space-y-4">
          <dt className="sr-only">Description</dt>
          <dd className="break-all text-sm text-gray-500">
            Description: {nft.description}
          </dd>
          <dt className="sr-only">Title</dt>
          <dd className="break-all text-sm text-gray-500">
            Title: {nft.title}
          </dd>
          <dt className="sr-only">Token ID</dt>
          <dd className="break-all text-sm text-gray-500">
            Token ID: {nft.tokenId}
          </dd>
          <dt className="sr-only">Smart Contract Address</dt>
          <dd className="break-all text-sm text-gray-500">
            Address: {nft.contract.address}
          </dd>
        </dl>
      </div>
    </li>
  );
};

export default NftPageContent;
