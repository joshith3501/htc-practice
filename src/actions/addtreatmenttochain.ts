"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addTreatmentToBlockchain = async (mail: any, tx: any) => {
  const treatment = await db.treatment.update({
    where: {
      id: mail.id,
    },
    data: {
      published: true,
    },
  });

  const txHash = JSON.stringify(tx);

  const recordtreatmenthash = await db.hashes.create({
    data: {
      treatmentHash: txHash,
    }
  })

  revalidatePath('/dashboard')

  // return txHash;
};
