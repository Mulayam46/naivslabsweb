import type { Metadata } from "next";
import { RequestAccess } from "@/components/site/request-access";

export const metadata: Metadata = {
  title: "Request access · Private beta",
  description:
    "Navis is onboarding a small group of founder-led startups. Request access to the Founder Daily Brief.",
};

export default function RequestAccessPage() {
  return <RequestAccess />;
}
