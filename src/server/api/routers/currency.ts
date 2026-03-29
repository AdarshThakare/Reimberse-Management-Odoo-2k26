/**
 * Currency Router
 *
 * Public: fetch country → currency mappings.
 * Protected: convert amounts between currencies.
 */

import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  employeeProcedure,
} from "~/server/api/trpc";
import {
  fetchCountriesWithCurrencies,
  convertAmount,
} from "~/server/services/currency.service";

export const currencyRouter = createTRPCRouter({
  /**
   * List all countries with their primary currency.
   * Used in the company setup flow (country picker).
   * Public since the user hasn't created a company yet.
   */
  listCountries: publicProcedure.query(async () => {
    return fetchCountriesWithCurrencies();
  }),

  /**
   * Convert an amount between two currencies.
   * Uses cached exchange rates (1-hour TTL).
   */
  convert: employeeProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        fromCurrency: z.string().length(3),
        toCurrency: z.string().length(3),
      }),
    )
    .query(async ({ ctx, input }) => {
      return convertAmount(
        ctx.db,
        input.amount,
        input.fromCurrency,
        input.toCurrency,
      );
    }),

  /**
   * List all currencies that exist in our database.
   * Used for currency selection dropdowns.
   */
  list: employeeProcedure.query(async ({ ctx }) => {
    return ctx.db.currency.findMany({
      orderBy: { id: "asc" },
    });
  }),
});
