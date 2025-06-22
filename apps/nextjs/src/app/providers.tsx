import { TRPCReactProvider } from "@gym/trpc/react";
import { Toaster } from "@gym/ui/components/sonner";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <TRPCReactProvider>
        {children}
        <Toaster />
      </TRPCReactProvider>
    </SessionProvider>
  );
};

export default Providers;
