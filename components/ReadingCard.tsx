// app/components/ReadingCard.tsx
"use client";

import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import type { Reading } from "@prisma/client";

interface ReadingCardProps {
  reading: Reading;
  isSelected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
}

export default function ReadingCard({
  reading,
  isSelected = false,
  onSelect,
  onClick,
}: ReadingCardProps) {
  const getBPCategory = (sys: number, dia: number) => {
    if (sys < 120 && dia < 80)
      return { label: "Normal", color: "bg-green-500", text: "text-green-600" };
    if (sys <= 129 && dia < 80)
      return {
        label: "Elevated BP",
        color: "bg-lime-500",
        text: "text-lime-600",
      };
    if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89))
      return {
        label: "Stage 1",
        color: "bg-yellow-500",
        text: "text-yellow-600",
      };
    if (sys >= 140 || dia >= 90)
      return {
        label: "Stage 2",
        color: "bg-orange-500",
        text: "text-orange-600",
      };
    if (sys > 180 || dia > 120)
      return {
        label: "Hypertensive Crisis",
        color: "bg-red-600",
        text: "text-red-600",
      };
    return { label: "", color: "", text: "" };
  };

  const { label, color, text } = getBPCategory(
    reading.systolic,
    reading.diastolic
  );

  const formatDateLabel = (utcDate: Date) => {
    // date-fns automatically converts to local timezone when formatting
    return format(utcDate, "EEE, dd MMM yyyy @ HH:mm");
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl overflow-hidden shadow-md transition-all cursor-pointer ${
        isSelected ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      {/* Header with checkbox and date */}
      <div
        className={`px-4 py-2 flex items-center justify-between ${
          isSelected ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          {onSelect && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="w-5 h-5 rounded border-gray-400"
            />
          )}
          <span
            className={`text-sm font-medium ${
              isSelected ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {formatDateLabel(reading.createdAt)}
          </span>
        </div>
        <ChevronRight
          className={`w-5 h-5 ${
            isSelected ? "text-gray-400" : "text-gray-400"
          }`}
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex justify-between mb-3">
          {/* SYS-DIA */}
          <div className="flex-1 text-center">
            <div className="text-xs text-gray-500">SYS - DIA</div>
            <div
              className={`text-2xl font-bold ${
                isSelected ? "text-white" : text
              }`}
            >
              {reading.systolic} – {reading.diastolic}
            </div>
            <div className="text-xs text-gray-500">mmHg</div>
          </div>

          {/* Pulse */}
          <div className="flex-1 text-center">
            <div className="text-xs text-gray-500">Pulse</div>
            <div
              className={`text-2xl font-bold ${
                isSelected ? "text-white" : "text-gray-800"
              }`}
            >
              {reading.pulse ?? "--"}
            </div>
            <div className="text-xs text-gray-500">BPM</div>
          </div>

          {/* Weight */}
          <div className="flex-1 text-center">
            <div className="text-xs text-gray-500">Weight</div>
            <div
              className={`text-2xl font-bold ${
                isSelected ? "text-white" : "text-gray-800"
              }`}
            >
              {reading.weight ? reading.weight.toFixed(1) : "--"}
            </div>
            <div className="text-xs text-gray-500">kgs</div>
          </div>
        </div>

        {/* BP Category */}
        {label && (
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span
              className={`font-medium ${
                isSelected ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
