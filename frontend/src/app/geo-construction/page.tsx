import type { Metadata } from "next";
import DivisionPage from "@/components/DivisionPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "GEO Construction", description: "Civil and construction delivery by GEO Construction." };

export default function GeoConstructionPage() {
  return <DivisionPage division="geo-construction" />;
}
