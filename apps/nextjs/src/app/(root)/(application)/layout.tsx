import { auth } from "@gym/trpc/auth";
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

  return <ApplicationGrid>{children}</ApplicationGrid>;
};

export default ApplicationLayout;
