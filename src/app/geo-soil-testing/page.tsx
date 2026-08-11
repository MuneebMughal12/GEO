import type { Metadata } from "next";
import DivisionPage from "@/components/DivisionPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "GEO Soil Testing", description: "Site investigation and geotechnical laboratory services by GEO Soil Testing." };

export default function GeoSoilTestingPage() {
  return <DivisionPage division="geo-soil-testing" />;
}
