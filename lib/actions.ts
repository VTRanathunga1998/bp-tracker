"use server";

import prisma from "@/lib/prisma";
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
