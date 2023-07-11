import { TRPCError } from "@trpc/server";
import { BitcoinPriceIndex } from "../../types";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const btcPriceIndex = createTRPCRouter({
  currentPriceIndex: publicProcedure.query(async () => {
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );

    if (!response.ok) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }

    const data = (await response.json()) as BitcoinPriceIndex;

    return data;
  }),
});
