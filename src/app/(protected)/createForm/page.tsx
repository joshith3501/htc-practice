"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { TreatmentScheme } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/auth/header";

import { ethers } from "ethers";

import { createtreatment } from "@/actions/createtreatment";
import { useSession } from "next-auth/react";
import { db } from "@/lib/db";
import { getCurrentAddress } from "@/actions/getaddress";
// import router from "next/router";
import { useRouter } from "next/navigation";

// const createForm = () => {
//   const form = useForm<z.infer<typeof TreatmentScheme>>({
//     resolver: zodResolver(TreatmentScheme),
//     defaultValues: {
//       patientAddress: "",
//       guardianAddress: "",
//       treatmentDetails: "",
//     },
//   });

//   const router =  useRouter();
//   const session = useSession();

//   const [error, setError] = useState("");

//   // const metamaskAddress = new ethers.BrowserProvider((window as any).ethereum);

//   const treatmentCreateHandle = async (
//     values: z.infer<typeof TreatmentScheme>
//   ) => {
//     const metamaskAddress = await getCurrentAddress(session.data?.user);

//     if (metamaskAddress) {
//       createtreatment(values, metamaskAddress).then((data) => {
//         console.log(data);
//       });
//     } else {
//       console.log("no Address Found!");
//     }

//     // revalidatePath("/dashboard");
//     router.push("/dashboard");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <Card className="w-[900px] ">
//         <CardHeader>
//           <Header label="Add Treatment" />
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(treatmentCreateHandle)}
//               className="space-y-4"
//             >
//               <div className="space-y-4">
//                 <div className="flex space-x-8">
//                   <FormField
//                     control={form.control}
//                     name="patientAddress"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Add patient address</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...field}
//                             placeholder="0x9fc3g....."
//                             type="text"
//                             className="w-[400px]"
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="guardianAddress"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Add guardian Address</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...field}
//                             placeholder="0x9fc3g....."
//                             type="text"
//                             className="w-[400px]"
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="treatmentDetails"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Treatment Details</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           {...field}
//                           placeholder="Add the treatment Details"
//                           className="h-[100px]"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="flex w-full justify-between space-x-10">
//                 <Button
//                   variant="destructive"
//                   className="w-[400px] cursor-pointer"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="secondary"
//                   className="w-[400px] cursor-pointer"
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

const createForm= () => {
  
}

export default createForm;
