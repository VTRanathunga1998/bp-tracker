// app/history/page.tsx
import HistoryList from "@/components/HistoryList";
import { getAllReadings } from "@/lib/actions";

export default async function HistoryPage() {
  const readings = await getAllReadings();

  return <HistoryList initialReadings={readings} />;
}
