import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";

const NoSSRWrapper: React.FC<PropsWithChildren> = (props) => (
  <>{props.children}</>
);

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
