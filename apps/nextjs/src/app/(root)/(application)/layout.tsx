import { auth } from "@gym/trpc/auth";
import { HydrateClient } from "@gym/trpc/server";
import { redirect } from "next/navigation";
import ApplicationGrid from "./ApplicationGrid";

const ApplicationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
