import { auth } from "@gym/trpc/auth";
import { redirect } from "next/navigation";

const ApplicationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return <div>{children}</div>;
};

export default ApplicationLayout;
