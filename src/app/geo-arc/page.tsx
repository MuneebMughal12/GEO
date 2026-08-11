import type { Metadata } from "next";
import DivisionPage from "@/components/DivisionPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "GEO ARC", description: "Architecture and design portfolio by GEO ARC." };

export default function GeoArcPage() {
  return <DivisionPage division="geo-arc" />;
}
