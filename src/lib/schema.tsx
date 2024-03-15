import * as z from "zod";

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip is required"),
});

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
  name: z.string().min(1, "Name is required"),
  wallet: z.string().min(1, "Wallet Address required"),
});

export const TreatmentScheme = z.object({
  patientAddress: z.string().min(1),
  guardianAddress: z.string().min(1),
  treatmentDetails: z.string().min(1),
})
