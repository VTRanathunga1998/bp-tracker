// app/components/HistoryList.tsx
"use client";

import { useState } from "react";
import ReadingCard from "./ReadingCard";
import EditReadingForm from "./EditReadingForm";
import { Trash2, Share2, CheckSquare, Square } from "lucide-react";
import type { Reading } from "@prisma/client";
import { deleteReading } from "@/lib/actions";

interface HistoryListProps {
  initialReadings: Reading[];
}

export default function HistoryList({ initialReadings }: HistoryListProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [editingReading, setEditingReading] = useState<Reading | null>(null);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === initialReadings.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(initialReadings.map((r) => r.id)));
    }
  };

  const handleDelete = async () => {
    if (
      confirm(`Delete ${selectedIds.size} reading(s)? This cannot be undone.`)
    ) {
      for (const id of selectedIds) {
        await deleteReading(id);
      }
      setSelectedIds(new Set());
    }
  };

  const handleShare = () => {
    alert("Share feature coming soon!");
  };

  // Show edit form if a reading is selected for editing
  if (editingReading) {
    return (
      <EditReadingForm
        reading={editingReading}
        onClose={() => setEditingReading(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Top Action Bar */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={selectAll}
            className="flex items-center gap-2 text-gray-700"
          >
            {selectedIds.size === initialReadings.length &&
            initialReadings.length > 0 ? (
              <CheckSquare size={24} />
            ) : (
              <Square size={24} />
            )}
            <span className="text-sm">
              {selectedIds.size > 0 ? `${selectedIds.size} selected` : "Select"}
            </span>
          </button>

          <div className="flex gap-6">
            {selectedIds.size > 0 && (
              <button onClick={handleDelete} className="text-red-600">
                <Trash2 size={24} />
              </button>
            )}
            <button onClick={handleShare} className="text-gray-700">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Readings List */}
      <div className="px-4 pt-4 space-y-4">
        {initialReadings.map((reading) => (
          <ReadingCard
            key={reading.id}
            reading={reading}
            isSelected={selectedIds.has(reading.id)}
            onSelect={() => toggleSelect(reading.id)}
            onClick={() => setEditingReading(reading)} // Open edit form
          />
        ))}
      </div>

      {initialReadings.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No readings yet</div>
      )}
    </div>
  );
}
