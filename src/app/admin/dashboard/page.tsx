import { Metadata } from "next";
import { Fragment } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return <Fragment />;
}
