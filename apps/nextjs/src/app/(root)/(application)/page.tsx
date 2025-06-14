import { api, HydrateClient } from "@gym/trpc/server";
import { auth } from "@gym/trpc/auth";
import ApplicationGrid from "./ApplicationGrid";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <ApplicationGrid />
    </HydrateClient>
  );
}
