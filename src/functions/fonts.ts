import { Geist, Poppins } from "next/font/google";
import localFont from "next/font/local";

export const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
});

export const poppins = Poppins({
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-secondary-poppins",
});
