import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { company } from "@/data/company";
import { getSiteSettings } from "@/lib/site-settings-repo";

export const dynamic = "force-dynamic";

const jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jamjuree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://geogroupofcompanies.com"),
  title: {
    default: `${company.name} | Design, Testing & Construction`,
    template: `%s | ${company.short}`,
  },
  description: company.intro.slice(0, 158),
  keywords: [
    "GEO Group of Companies",
    "soil testing Islamabad",
    "architectural design Islamabad",
    "construction company Islamabad",
    "GEO ARC",
    "geotechnical laboratory Pakistan",
  ],
  openGraph: {
    title: `${company.name} | Design, Testing & Construction`,
    description: company.intro.slice(0, 158),
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" className={`${jamjuree.variable} antialiased`}>
      <body>
        <SiteShell footerImage={settings.footerImage}>{children}</SiteShell>
      </body>
    </html>
  );
}
