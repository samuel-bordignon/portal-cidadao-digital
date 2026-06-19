import type { Metadata } from "next";
import { Lora, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Cidadão Digital",
  description: "Portal informativo de segurança digital, cidadania e educação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "font-sans", sora.variable, lora.variable)}
    >
      <body className="min-h-full flex flex-col">
       {children}
      </body>
    </html>
  );
}
