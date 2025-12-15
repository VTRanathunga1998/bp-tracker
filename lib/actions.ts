"use server";

import prisma from "@/lib/prisma";
import { Reading } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addReading(formData: FormData) {
  const systolic = Number(formData.get("systolic"));
  const diastolic = Number(formData.get("diastolic"));
  const pulse = formData.get("pulse") ? Number(formData.get("pulse")) : null;
  const weight = formData.get("weight") ? Number(formData.get("weight")) : null;

  if (!systolic || !diastolic || isNaN(systolic) || isNaN(diastolic)) {
    throw new Error("Valid Systolic and Diastolic values are required");
  }

  await prisma.reading.create({
    data: {
      systolic,
      diastolic,
      pulse,
      weight,
    },
  });

  revalidatePath("/");
}

export async function deleteReading(id: number) {
  "use server";
  await prisma.reading.delete({ where: { id } });
  revalidatePath("/history");
  revalidatePath("/");
}

export async function getAllReadings(): Promise<Reading[]> {
  return await prisma.reading.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getLatestReadings(): Promise<Reading[]> {
  return await prisma.reading.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

export async function updateReading(formData: FormData) {
  const id = Number(formData.get("id"));
  const systolic = Number(formData.get("systolic"));
  const diastolic = Number(formData.get("diastolic"));
  const pulse = formData.get("pulse") ? Number(formData.get("pulse")) : null;
  const weight = formData.get("weight") ? Number(formData.get("weight")) : null;

  // New fields from form
  const measurementSite = formData.get("measurementSite") as string | null;
  const measurementPosition = formData.get("measurementPosition") as
    | string
    | null;
  const tags = formData.getAll("tags").join(", ") || null; // multi-select sends multiple

  await prisma.reading.update({
    where: { id },
    data: {
      systolic,
      diastolic,
      pulse,
      weight,
      measurementSite,
      measurementPosition,
      tags,
    },
  });

  revalidatePath("/history");
  revalidatePath("/");
}
