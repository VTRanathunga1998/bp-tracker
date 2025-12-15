// app/components/PastRecords.tsx
import { format, isToday, isYesterday } from "date-fns";
import prisma from "@/lib/prisma";
import type { Reading } from "@prisma/client";

async function getLatestReadings(): Promise<Reading[]> {
  return await prisma.reading.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

function getBPCategory(sys: number, dia: number) {
  if (sys < 120 && dia < 80) return { label: "Normal", color: "bg-green-500" };
  if (sys <= 129 && dia < 80)
    return { label: "Elevated BP", color: "bg-lime-500" };
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89))
    return { label: "Stage 1", color: "bg-yellow-500" };
  if (sys >= 140 || dia >= 90)
    return { label: "Stage 2", color: "bg-orange-500" };
  if (sys > 180 || dia > 120)
    return { label: "Hypertensive Crisis", color: "bg-red-600" };
  return { label: "", color: "" };
}

function formatDateLabel(date: Date) {
  if (isToday(date)) return `Today @ ${format(date, "HH:mm")}`;
  if (isYesterday(date)) return `Yesterday @ ${format(date, "HH:mm")}`;
  return format(date, "dd MMM @ HH:mm");
}

export default async function PastRecords() {
  const readings = await getLatestReadings();

  if (readings.length === 0) return null;

  return (
    <div className="mx-4 mt-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Past 3 Records
      </h2>

      <div className="space-y-4">
        {readings.map((reading: Reading) => {
          // ← Explicitly type here (or rely on function return type)
          const { label, color } = getBPCategory(
            reading.systolic,
            reading.diastolic
          );

          return (
            <div
              key={reading.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Date Header */}
              <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                {formatDateLabel(reading.createdAt)}
              </div>

              {/* Values */}
              <div className="p-4">
                <div className="grid grid-cols-3 text-center mb-3">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {reading.systolic} - {reading.diastolic}
                    </div>
                    <div className="text-xs text-gray-500">mmHg</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {reading.pulse ?? "--"}
                    </div>
                    <div className="text-xs text-gray-500">BPM</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {reading.weight ? reading.weight.toFixed(1) : "--"}
                    </div>
                    <div className="text-xs text-gray-500">kgs</div>
                  </div>
                </div>

                {/* BP Category */}
                {label && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    <span className="font-medium text-gray-700">{label}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
