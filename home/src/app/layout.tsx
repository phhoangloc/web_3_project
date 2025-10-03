import type { Metadata } from "next";
import { Itim, Noto_Serif } from "next/font/google";
import "../style/globals.css";
import Provider from "@/redux/component/provider";
import { Header } from "@/components/layout/header";
export const metadata: Metadata = {
  title: "Walleto",
};

const fontItim = Itim({
  variable: "--font-sans",
  subsets: ['latin'],
  weight: ["400"]
})
const fontNoto = Noto_Serif({
  variable: "--font-serif",
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${fontItim.className} ${fontNoto.className}`}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
