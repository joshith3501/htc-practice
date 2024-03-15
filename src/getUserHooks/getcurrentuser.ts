import { db } from "@/lib/db";
import { useSession } from "next-auth/react";

export const getCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};


export const getCurrentUserAddress = async () => {
  const session = useSession();

  const check = await db.user.findUnique({where: { id: session.data?.user.id}})

  return check;
}
