import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

const isUnauthorizedError = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null) return false;

  const maybeError = error as {
    message?: unknown;
    data?: { code?: unknown };
  };

  if (maybeError.data?.code === "UNAUTHORIZED") {
    return true;
  }

  return (
    typeof maybeError.message === "string" &&
    maybeError.message.toUpperCase().includes("UNAUTHORIZED")
  );
};

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
        retry: (failureCount, error) => {
          // Auth errors are expected after logout/session expiry and should not retry.
          if (isUnauthorizedError(error)) return false;
          return failureCount < 2;
        },
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
