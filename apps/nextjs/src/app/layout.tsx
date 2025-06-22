import "@gym/ui/styles/globals.css";

import { type Metadata } from "next";

import Providers from "./providers";
import MotivationOverlay from "./components/MotivationOverlay";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Gym Tracker",
  description: "Created by Arthur Toppenberg",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <MotivationOverlay />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
