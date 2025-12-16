// app/components/BPInputForm.tsx
"use client";

import { format } from "date-fns";
import { useState } from "react";
import { addReading } from "@/lib/actions";

interface BPInputFormProps {
  initialWeight: number | null | undefined;
}

export default function BPInputForm({ initialWeight }: BPInputFormProps) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  // Safely convert: if undefined or null → empty string
  const [weight, setWeight] = useState(
    initialWeight != null ? initialWeight.toFixed(1) : ""
  );

  const today = new Date();
  const [date, setDate] = useState(format(today, "yyyy-MM-dd"));
  const [time, setTime] = useState(format(today, "HH:mm"));

  const sys = Number(systolic) || 0;
  const dia = Number(diastolic) || 0;
  const pp = sys > 0 && dia > 0 ? sys - dia : 0;
  const map = sys > 0 && dia > 0 ? Math.round(dia + pp / 3) : 0;

  let category = "";
  let categoryColor = "";
  if (sys < 120 && dia < 80) {
    category = "Normal";
    categoryColor = "bg-green-500";
  } else if (sys <= 129 && dia < 80) {
    category = "Elevated BP";
    categoryColor = "bg-lime-500";
  } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
    category = "Stage 1";
    categoryColor = "bg-yellow-500";
  } else if (sys >= 140 || dia >= 90) {
    category = "Stage 2";
    categoryColor = "bg-orange-500";
  } else if (sys > 180 || dia > 120) {
    category = "Hypertensive Crisis";
    categoryColor = "bg-red-600";
  }

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("systolic", systolic);
    formData.append("diastolic", diastolic);
    if (pulse) formData.append("pulse", pulse);
    if (weight) formData.append("weight", weight);

    // ← THIS IS THE ONLY LINE YOU CHANGE
    const localDateTime = new Date(`${date}T${time}`);
    formData.append("dateTime", localDateTime.toISOString());

    await addReading(formData);

    setSystolic("");
    setDiastolic("");
    setPulse("");
  }

  return (
    <>
      {/* Main Input Card */}
      <div className="mx-4 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 relative">
          {/* Date & Time */}
          {/* <div className="absolute top-4 right-4 text-right">
            <div className="text-sm">
              {format(new Date(), "dd MMM yyyy")}, {format(new Date(), "HH:mm")}
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-sm text-gray-600">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-1 text-xl font-medium border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full mt-1 text-xl font-medium border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1"
              />
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-12">
            <div>
              <div className="text-xl font-medium text-gray-700">SYS</div>
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
              <div className="text-xl font-medium text-gray-700">DIA</div>
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
              <div className="text-xl font-medium text-gray-700">PULSE</div>
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
              <div className="text-xl font-medium text-gray-700">WEIGHT</div>
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

          {/* PP & MAP */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
            <div className="text-sm">
              <span className="text-gray-500">PP:</span>{" "}
              <span className="font-semibold">
                {pp > 0 ? `${pp} mmHg` : "--"}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">MAP:</span>{" "}
              <span className="font-semibold">
                {map > 0 ? `${map} mmHg` : "--"}
              </span>
            </div>
          </div>

          {/* BP Category */}
          {category && (
            <div className="mt-6 flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${categoryColor}`}></div>
              <span className="font-semibold text-gray-800">{category}</span>
            </div>
          )}
        </div>
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
    </>
  );
}
