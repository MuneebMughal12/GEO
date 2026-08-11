"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * The public site chrome (nav, footer, cursor, preloader…) wraps every page
 * except the admin panel, which gets a clean, app-like shell of its own.
 */
export default function SiteShell({ children, footerImage }: { children: React.ReactNode; footerImage?: string }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>{children}</main>
      <Footer image={footerImage} />
      <WhatsAppButton />
    </>
  );
}
