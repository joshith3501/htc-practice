"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

// import {
//   TextField,
//   Button as MuiButton,
//   Container,
//   Typography,
//   Grid,
//   TextareaAutosize,
//   InputLabel,
// } from "@mui/material";

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
import { Label } from "@/components/ui/label";


const createForm = () => {

  const session = useSession();
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    patientAddress: "",
    guardianAddress: "",
    treatmentTitle: "",
    treatmentDetails: "",
    treatmentCourse: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    const data = {...formData, treatmentCourse: formData.treatmentCourse.split(',')}
    const metamaskAddress = await getCurrentAddress(
      session.data?.user
    );
    
    metamaskAddress && createtreatment(data, metamaskAddress);

    router.push("/dashboard");

  };

  useEffect(()=>{
    setIsDisabled(false);
  },[]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[1200px] ">
        <CardHeader>
          <Header label="Add Treatment" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="flex space-x-8 mb-2">
          
                <div className="flex flex-col space-y-2 flex-1">
                  <Label htmlFor="patientAddress">Add patient Address</Label>
                  <Input
                    name="patientAddress"
                    id="patientAddress"
                    placeholder="0x9fc3g....."
                    type="text"
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                
                <div className="flex flex-col space-y-2 flex-1">
                  <Label htmlFor="guardianAddress">Add guardian Address</Label>
                  <Input
                    name="guardianAddress"
                    id="guardianAddress"
                    placeholder="0x9fc3g....."
                    type="text"
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>

              <Label htmlFor="treatmentTitle">Add Treatment Title</Label>
              <Input
                id="treatmentTitle"
                name="treatmentTitle"
                placeholder="Add the title of the problem of patient"
                onChange={handleChange}
                // className="w-[100px]"
              />

            
              <Label htmlFor="treatmentDetails">Add Treatment Detail</Label>
              <Textarea
                id="treatmentDetails"
                name="treatmentDetails"
                placeholder="Add the treatment Details"
                onChange={handleChange}
                className="h-[100px]"
              />

              <Label htmlFor="treatmentCourse">Add Treatment Course</Label>
              <Textarea
                id="treatmentCourse"
                name="treatmentCourse"
                placeholder="Add course medicine separated by commas"
                onChange={handleChange}
                className="h-[100px]"
              />
            </div>
            <div className="flex w-full justify-between space-x-10">
              <Button variant="destructive" className="flex-1 cursor-pointer">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="secondary"
                className="flex-1 cursor-pointer"
                disabled={isDisabled}
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default createForm;



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