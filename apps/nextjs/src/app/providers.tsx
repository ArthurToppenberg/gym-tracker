import { TRPCReactProvider } from "@gym/trpc/react";
import { Toaster } from "@gym/ui/components/sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      {children}
      <Toaster />
    </TRPCReactProvider>
  );
};

export default Providers;
