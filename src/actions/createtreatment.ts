"use server"
import { TreatmentScheme } from "@/lib/schema";
import * as z from 'zod';
import ethers from "ethers";
import { db } from "@/lib/db";

export const createtreatment = async (
  values: z.infer<typeof TreatmentScheme>,
  metamaskAddress: string
) => {
  // const validatedFields = TreatmentScheme.safeParse(values);

  // if (!validatedFields.success) {
  //   return { error: "Invalid fields!" };
  // }

  // const { email, password, name, wallet } = validatedFields.data;
  // const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);

  // const existingUser = await db.user.findUnique({ where: { email } });

  // if (existingUser) {
  //   return { error: "email already in use!" };
  // }

  // await db.user.create({
  //   data: {
  //     email,
  //     name,
  //     password: hashedPassword,
  //     walletAddress: wallet,
  //   },
  // });

  // // TODO: Send Vertification Token Email

  // return { success: "Registered!" };

  // const doctorAddress = (await metamaskAddress.getSigner()).address;

  console.log(metamaskAddress)

  const validatedFields = TreatmentScheme.safeParse(values);

  if (validatedFields.success) {
    const { guardianAddress, patientAddress, treatmentDetails } =
      validatedFields.data;

    await db.treatment.create({
      data: {
        patientAddress: patientAddress,
        guardianAddress: guardianAddress,
        doctorAddress: metamaskAddress,
        treatmentDetails: treatmentDetails,
      },
    });
  } else {
    return { error: "invalid fields!" };
    // Handle validation errors...
  }

  return { success: "Treatment Created" };
};

