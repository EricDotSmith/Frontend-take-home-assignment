import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

const PageTopBar: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center space-y-2 bg-white px-4 py-4 shadow-sm  sm:flex-row sm:justify-between sm:space-y-0 sm:py-0">
      <div className="flex space-x-2 pb-2 pt-2">
        <Web3Button />
        <Web3NetworkSwitch />
      </div>
    </div>
  );
};

export default PageTopBar;
