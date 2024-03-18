import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation/navigation";
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trippy",
  description: "Find your next place to go!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

          <div
            style={{
              display: "flex",
              margin: 0,
              padding: 0,
              position: "relative",
            }}
          >
            <Navigation></Navigation>
            <div style={{ margin: "0 0 0 4rem" }}>
                {children}
            </div>
          </div>

  );
}
