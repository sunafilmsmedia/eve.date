import type { Metadata } from "next";
import { AccountDashboard } from "@/components/AccountDashboard";

export const metadata: Metadata = {
  title: "Mon compte · Eve AI",
};

export default function AccountPage() {
  return <AccountDashboard />;
}
