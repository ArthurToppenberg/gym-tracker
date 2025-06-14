import { auth } from "@gym/trpc/auth";
import { api, HydrateClient } from "@gym/trpc/server";
import { redirect } from "next/navigation";
import ApplicationGrid from "./ApplicationGrid";

const ApplicationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //keeping this as a reference on how we make the trpc calls
  //const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <HydrateClient>
      <ApplicationGrid>{children}</ApplicationGrid>
    </HydrateClient>
  );
};

export default ApplicationLayout;
