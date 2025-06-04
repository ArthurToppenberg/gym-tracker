import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@gym/env";
import { appRouter } from "@gym/trpc/api";
import { createTRPCContext } from "@gym/trpc/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? (opts) => {
            console.error(
              `❌ tRPC failed on ${opts.path ?? "<no-path>"}: ${opts.error.message}`
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
