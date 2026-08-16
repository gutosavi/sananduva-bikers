import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const neueMachina = localFont({
  src: [
    {
      path: "../app/fonts/NeueMachina-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/fonts/NeueMachina-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/NeueMachina-Ultrabold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-neue-machina",
});
