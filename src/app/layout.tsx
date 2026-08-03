import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import DevLabel from "@/components/DevLabel";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Pizza House",
  description: "Заказ циппы с доставкой",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <DevLabel name="Header.tsx" color="blue">
          <Header />
        </DevLabel>

        <main>{children}</main>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
