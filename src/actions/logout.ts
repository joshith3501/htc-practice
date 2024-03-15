"use server";

import { auth, signOut } from "@/auth";

export const logout = async () => {
  // await signOut({ redirectTo : '/'});
  await signOut();
};
