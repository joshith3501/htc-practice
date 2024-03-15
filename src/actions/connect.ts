"use server";
import * as z from "zod";
import { ethers } from "ethers";

import { LoginSchema } from "@/lib/schema";

export const connect = async () => {
  if (!(window as any).ethereum) {
    return { error: "No metamask Loggin in!" };
  }

  const address = new ethers.BrowserProvider((window as any).ethereum);

  console.log(address);

  return { success: { address } };
};
