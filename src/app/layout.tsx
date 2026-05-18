import type { Metadata } from "next";
import { Montserrat, Yellowtail } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Eve — Tes prochaines sorties, sublimées par l'IA",
  description:
    "Eve te propose des idées de dates inoubliables à Montréal, Laval, Brossard et Magog. Premières rencontres, anniversaires, soirées spéciales — testées et notées par la communauté.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${yellowtail.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
