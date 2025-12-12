"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

// Add new blood pressure reading
export async function addReading(formData: FormData) {
  const systolic = Number(formData.get("systolic"));
  const diastolic = Number(formData.get("diastolic"));
  const pulse = formData.get("pulse") ? Number(formData.get("pulse")) : null;
  const weight = formData.get("weight") ? Number(formData.get("weight")) : null;
  const notes = (formData.get("notes") as string) || null;

  if (!systolic || !diastolic) {
    throw new Error("Systolic and Diastolic values are required");
  }

  await prisma.reading.create({
    data: {
      systolic,
      diastolic,
      pulse,
      weight,
      notes,
    },
  });

  // Refresh the page that shows latest reading
  revalidatePath("/");
  revalidatePath("/history");
}

// Optional: delete reading
export async function deleteReading(id: number) {
  await prisma.reading.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/history");
}
