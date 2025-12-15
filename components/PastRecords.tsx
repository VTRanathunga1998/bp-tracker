export const dynamic = "force-dynamic";

import ReadingCard from "./ReadingCard";
import { getLatestReadings } from "@/lib/actions";

export default async function PastRecords() {
  const readings = await getLatestReadings();

  if (readings.length === 0) return null;

  return (
    <div className="mx-4 mt-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Past 3 Records
      </h2>
      <div className="space-y-4">
        {readings.map((reading) => (
          <ReadingCard key={reading.id} reading={reading} />
        ))}
      </div>
    </div>
  );
}
