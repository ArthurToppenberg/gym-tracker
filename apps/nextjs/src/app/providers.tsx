"use client";

import { TRPCReactProvider } from "@gym/trpc/react";
import { Toaster } from "@gym/ui/components/sonner";
import { SessionProvider } from "next-auth/react";

import MotivationOverlay from "./components/MotivationOverlay";

const Providers = ({
  children,
  headers,
}: {
  children: React.ReactNode;
  headers: HeadersInit;
}) => {
  return (
    <TRPCReactProvider headers={headers}>
      <SessionProvider>
        {children}
        <MotivationOverlay />
        <Toaster />
      </SessionProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
