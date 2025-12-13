"use client";

import { format } from "date-fns";
import { useState } from "react";
import { addReading } from "@/lib/actions";

export default function HomePage() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [weight, setWeight] = useState("");

  // Calculate PP and MAP live as user types
  const sys = Number(systolic) || 0;
  const dia = Number(diastolic) || 0;
  const pp = sys - dia;
  const map = Math.round(dia + pp / 3);

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("systolic", systolic);
    formData.append("diastolic", diastolic);
    if (pulse) formData.append("pulse", pulse);
    if (weight) formData.append("weight", weight);

    await addReading(formData);

    // Optional: clear fields after save
    setSystolic("");
    setDiastolic("");
    setPulse("");
    setWeight("");
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Main Input Card */}
      <div className="mx-4 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 relative">
          {/* Current Date & Time */}
          <div className="absolute top-4 right-4 text-right">
            <div className="text-sm text-gray-500">
              {format(new Date(), "dd MMM yyyy")}, {format(new Date(), "HH:mm")}
            </div>
          </div>

          {/* Bell Icon */}
          <div className="absolute top-5 left-5 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-12">
            <div>
              <div className="text-lg font-medium text-gray-600">SYS</div>
              <div className="text-xs text-gray-400">mmHg</div>
            </div>
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="120"
              className="text-right text-4xl font-bold text-gray-800 bg-transparent outline-none placeholder-gray-300"
            />

            <div>
              <div className="text-lg font-medium text-gray-600">DIA</div>
              <div className="text-xs text-gray-400">mmHg</div>
            </div>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="80"
              className="text-right text-4xl font-bold text-gray-800 bg-transparent outline-none placeholder-gray-300"
            />

            <div>
              <div className="text-lg font-medium text-gray-600">PULSE</div>
              <div className="text-xs text-gray-400">BPM</div>
            </div>
            <input
              type="number"
              value={pulse}
              onChange={(e) => setPulse(e.target.value)}
              placeholder="72"
              className="text-right text-4xl font-bold text-gray-800 bg-transparent outline-none placeholder-gray-300"
            />

            <div>
              <div className="text-lg font-medium text-gray-600">WEIGHT</div>
              <div className="text-xs text-gray-400">kgs</div>
            </div>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="53.0"
              className="text-right text-4xl font-bold text-gray-800 bg-transparent outline-none placeholder-gray-300"
            />
          </div>

          {/* Live PP & MAP */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
            <div className="text-sm">
              <span className="text-gray-500">PP:</span>{" "}
              <span className="font-semibold text-gray-700">
                {pp > 0 ? `${pp} mmHg` : "--"}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">MAP:</span>{" "}
              <span className="font-semibold text-gray-700">
                {map > 0 ? `${map} mmHg` : "--"}
              </span>
            </div>
          </div>
        </div>
      </div>

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

      {/* Floating Save Button */}
      <form action={handleSubmit}>
        <button
          type="submit"
          disabled={!systolic || !diastolic}
          className="fixed bottom-24 right-6 z-10 bg-blue-600 disabled:bg-gray-400 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-4xl font-light hover:bg-blue-700 transition"
        >
          +
        </button>
      </form>
    </div>
  );
}
