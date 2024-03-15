"use server"
import { db } from "@/lib/db";

export const getCurrentAddress = async (identi: any) => {

  const user = await db.user.findUnique({
    where: {
      id: identi.id,
    },
  });

  if (user) {
    return user?.walletAddress;
  } 

}