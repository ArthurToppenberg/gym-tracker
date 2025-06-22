import { TRPCReactProvider } from "@gym/trpc/react";
import { Toaster } from "@gym/ui/components/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        {children}
        <Toaster />
        <SpeedInsights />
      </SessionProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
