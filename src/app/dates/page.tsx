import type { Metadata } from "next";
import { DatesFeed } from "@/components/DatesFeed";

export const metadata: Metadata = {
  title: "Dates · Eve AI",
};

export default function DatesPage() {
  return <DatesFeed />;
}
