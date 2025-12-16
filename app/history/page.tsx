// app/history/page.tsx
export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import HistoryList from "@/components/HistoryList";

export default async function HistoryPage() {
  const readings = await prisma.reading.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <HistoryList initialReadings={readings} />;
}
