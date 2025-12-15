// app/history/page.tsx
import prisma from "@/lib/prisma";
import HistoryList from "@/components/HistoryList";
import type { Reading } from "@prisma/client";

async function getAllReadings(): Promise<Reading[]> {
  return await prisma.reading.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function HistoryPage() {
  const readings = await getAllReadings();

  return <HistoryList initialReadings={readings} />;
}
