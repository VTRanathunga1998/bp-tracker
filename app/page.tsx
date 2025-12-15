// app/page.tsx
import prisma from "@/lib/prisma";
import PastRecords from "@/components/PastRecords";
import BPInputForm from "@/components/BPInputForm";

async function getLatestWeight() {
  const latest = await prisma.reading.findFirst({
    orderBy: { createdAt: "desc" },
    select: { weight: true },
  });
  return latest?.weight;
}

export default async function HomePage() {
  const latestWeight = await getLatestWeight();

  return (
    <div className="min-h-screen bg-cyan-50 pb-32">
      {/* Client Form with pre-filled weight */}
      <BPInputForm initialWeight={latestWeight ?? null} />

      {/* Action Buttons */}
      <div className="mx-4 mt-6 flex gap-3">
        <button className="flex-1 bg-orange-500 text-white font-medium py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Reminders
        </button>
        <button className="flex-1 bg-teal-500 text-white font-medium py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v8.158c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          Notifications
        </button>
      </div>

      {/* Past Records */}
      <PastRecords />
    </div>
  );
}
