import type { Metadata } from "next";
import { Web3Provider } from "../../context/Web3Provider";

export const metadata: Metadata = {
  title: "Boilerplate home test - Byzantine",
  description: "This is the boilerplate for your home test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Web3Provider>{children}</Web3Provider>;
}
