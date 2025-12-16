// app/components/EditReadingForm.tsx
"use client";

import { format } from "date-fns";
import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import type { Reading } from "@prisma/client";
import { updateReading } from "@/lib/actions";

interface EditReadingFormProps {
  reading: Reading;
  onClose: () => void;
}

const armOptions = [
  "Left Arm",
  "Right Arm",
  "Left Wrist",
  "Right Wrist",
  "Left Leg",
  "Right Leg",
];

const positionOptions = ["Standing", "Seated", "Horizontal"];

const tagOptions = [
  "Before Breakfast",
  "After Breakfast",
  "Before Lunch",
  "After Lunch",
  "Before Dinner",
  "After Dinner",
  "Before Blood Pressure Medication",
  "After Blood Pressure Medication",
  "Before Exercise",
  "After Exercise",
  "Low Salt Diet",
  "DASH Diet",
];

export default function EditReadingForm({
  reading,
  onClose,
}: EditReadingFormProps) {
  const [systolic, setSystolic] = useState(reading.systolic.toString());
  const [diastolic, setDiastolic] = useState(reading.diastolic.toString());
  const [pulse, setPulse] = useState(reading.pulse?.toString() || "");
  const [weight, setWeight] = useState(
    reading.weight ? reading.weight.toFixed(1) : ""
  );

  // Pre-fill existing values from DB
  const [arm, setArm] = useState(reading.measurementSite || "Left Arm");
  const [position, setPosition] = useState(
    reading.measurementPosition || "Seated"
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    reading.tags ? reading.tags.split(", ").filter(Boolean) : []
  );

  const [date, setDate] = useState(format(reading.createdAt, "yyyy-MM-dd"));
  const [time, setTime] = useState(format(reading.createdAt, "HH:mm"));

  const pp = Number(systolic) - Number(diastolic);
  const map = Math.round(Number(diastolic) + pp / 3);
  const bmi = reading.weight ? (reading.weight / (1.7 * 1.7)).toFixed(1) : "NA";

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  async function handleSave() {
    const formData = new FormData();
    formData.append("id", reading.id.toString());
    formData.append("systolic", systolic);
    formData.append("diastolic", diastolic);
    if (pulse) formData.append("pulse", pulse);
    if (weight) formData.append("weight", weight);

    // Save new/updated fields
    formData.append("measurementSite", arm);
    formData.append("measurementPosition", position);
    selectedTags.forEach((tag) => formData.append("tags", tag));

    const selectedDateTime = new Date(`${date}T${time}`);
    formData.append("dateTime", selectedDateTime.toISOString().slice(0, 19));

    await updateReading(formData);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm flex items-center px-4 py-3 z-10">
        <button onClick={onClose} className="mr-4">
          <ArrowLeft size={28} />
        </button>
        <h1 className="text-xl font-semibold">Details</h1>
      </div>

      <div className="px-6 pt-6 pb-32">
        {/* Editable Date & Time */}
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

        {/* SYS & DIA */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm text-gray-600">SYS (mmHg)</label>
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              className="text-3xl font-bold w-full mt-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">DIA (mmHg)</label>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className="text-3xl font-bold w-full mt-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Pulse & Weight */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm text-gray-600">Pulse (BPM)</label>
            <input
              type="number"
              value={pulse}
              onChange={(e) => setPulse(e.target.value)}
              className="text-3xl font-bold w-full mt-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Weight (kgs)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="text-3xl font-bold w-full mt-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Measurement Site */}
        <div className="mb-10">
          <label className="text-sm text-gray-600">Measurement site</label>
          <div className="relative">
            <select
              value={arm}
              onChange={(e) => setArm(e.target.value)}
              className="w-full mt-2 text-xl font-medium appearance-none bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-3 pr-12 transition-colors "
            >
              {armOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={28}
            />
          </div>
        </div>

        {/* Measurement Location */}
        <div className="mb-10">
          <label className="text-sm text-gray-600">Measurement location</label>
          <div className="relative">
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full mt-2 text-xl font-medium appearance-none bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-3 pr-12 transition-colors"
            >
              {positionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={28}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <label className="text-sm text-gray-600">Tags</label>
          <div className="flex flex-wrap gap-3 mt-3">
            {tagOptions.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Values */}
        <div className="bg-gray-100 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between">
            <span>Pulse Pressure (PP)</span>
            <span className="font-medium">
              {isNaN(pp) ? "--" : `${pp} mmHg`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Mean Arterial Pressure (MAP)</span>
            <span className="font-medium">
              {isNaN(map) ? "--" : `${map} mmHg`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Body Mass Index (BMI)</span>
            <span className="font-medium">{bmi}</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <button
          onClick={handleSave}
          className="w-full bg-teal-500 text-white font-semibold text-lg py-4 rounded-xl shadow-lg hover:bg-teal-600 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
