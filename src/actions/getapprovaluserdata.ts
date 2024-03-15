"use server";

import { db } from "@/lib/db";

export const getApprovalsforUser = async (id: any) => {
  const userAddress = await db.user.findUnique({ where: { id: id } });

  const data = await db.treatment.findMany({
    where: { guardianAddress: userAddress?.walletAddress, AND: {published: false} },
  });

  return data;
};
