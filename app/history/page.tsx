// app/history/page.tsx
export const dynamic = "force-dynamic"; // ← This disables all caching for this route

import prisma from "@/lib/prisma";
import HistoryList from "@/components/HistoryList";

export default async function HistoryPage() {
  const readings = await prisma.reading.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <HistoryList initialReadings={readings} />;
}
 