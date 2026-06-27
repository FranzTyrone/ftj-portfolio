import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fran'z Tyrone L. Jez De Ortega — Software Developer",
  description:
    "Computer Engineer & Software Developer based in the Philippines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
