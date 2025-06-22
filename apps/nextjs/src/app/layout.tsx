import "@gym/ui/styles/globals.css";

import { type Metadata } from "next";

import Providers from "./providers";
import { headers } from "next/headers";
import MotivationOverlay from "./components/MotivationOverlay";

export const metadata: Metadata = {
  title: "Gym Tracker",
  description: "Created by Arthur Toppenberg",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const heads = new Headers(await headers());

  return (
    <html lang="en">
      <body>
        <Providers headers={heads}>{children}</Providers>
      </body>
    </html>
  );
}
