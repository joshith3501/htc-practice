"use client";
// import { cookies } from "next/headers";
import MainNav from "./_components/main-nav";
import { Mail } from "./_components/mail";
import { accounts, mails } from "./data";
import { ethers } from "ethers";

import { RingLoader } from "react-spinners";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import {
  getDataFromBlockChain,
  getTreatmentData,
} from "@/actions/gettreatmentdata";
import { getCurrentAddress } from "@/actions/getaddress";
import {
  getCurrentUser,
  getCurrentUserAddress,
} from "@/getUserHooks/getcurrentuser";
import { Card, CardHeader } from "@/components/ui/card";
import { getCurrentRole } from "@/actions/getrole";
import { contractAddress, contractAbi } from "@/lib/constant";

// const override = css`
//   display: block;
//   margin: 0 auto;
// `;

// interface DataProps {
//   id: string;
//   patientAddress: string;
//   doctorAddress: string;
//   guardianAddress: string;
//   treatmentDetails: string;
//   createdAt: Date;
//   published: boolean;
//   archived: boolean;
// }

type DataProps = Array<Array<any>>;

export default function MailPage() {
  // const layout = cookies().get("react-resizable-panels:layout");
  // const collapsed = cookies().get("react-resizable-panels:collapsed");

  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  const defaultLayout = undefined;
  const defaultCollapsed = undefined;

  const session = useSession();

  const [data, setData] = useState<DataProps>();
  const [error, setError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [role, setRole] = useState("");

  // const handleFetchData = async () => {
  //   const signerAddress = new ethers.BrowserProvider((window as any).ethereum);

  //   if (!signerAddress) {
  //     setError("Please login into your metamask account");
  //     return;
  //   }
  //   const address = (await signerAddress.getSigner()).address;

  //   const loggedInAddress = await getCurrentAddress(session.data?.user);

  //   if (loggedInAddress) {
  //     if (address !== loggedInAddress) {
  //       setError(address + " " + loggedInAddress);
  //       return;
  //     }
  //   }

  //   setWalletAddress(address);

  //   const role = JSON.stringify(await getCurrentRole(session.data?.user));
  //   setRole(role);

  //   try {
  //     const fetchedData = await getTreatmentData();
  //     setData(fetchedData.slice().reverse());
  //   } catch (error) {
  //     // Handle errors (consider displaying a user-friendly error message)
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const handleFetchData = async () => {
    const providerAddress = new ethers.BrowserProvider(
      (window as any).ethereum
    );
    if (!providerAddress) {
      setError("Please login into your metamask account");
      return;
    }
    const address = (await providerAddress.getSigner()).address;

    const loggedInAddress = await getCurrentAddress(session.data?.user);

    if (loggedInAddress) {
      if (address !== loggedInAddress) {
        setError("Login with wallet connected to your account");
        return;
      }
    }

    setWalletAddress(address);
    const role = JSON.stringify(await getCurrentRole(session.data?.user));
    setRole(role);

    const getEthereumContract = async () => {
      const signerAddress = await providerAddress.getSigner();
      // console.log(signerAddress);

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signerAddress
      );

      return contract;
    };
    const getDataFromBlockChain = async () => {
      const treatmentContract = await getEthereumContract();

      const transactions = await treatmentContract.getTreatments();

      // console.log(transactions);

      return transactions;
    };

    try {
      const fetchedData = await getDataFromBlockChain();
      // console.log(fetchedData[0][0]);
      setData(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  // console.log(data);

  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div> */}
      <MainNav />

      <div className="min-w-screen flex-col md:flex">
        {error ? (
          <Card>
            <CardHeader>
              <div>{error}</div>
            </CardHeader>
          </Card>
        ) : data ? (
          <Mail
            mails={data}
            role={role}
            walletAddress={walletAddress}
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}
          />
        ) : (
          <div className="w-screen h-screen relative">
            <RingLoader
              color="#36D7B7"
              size={50}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        )}
      </div>
    </>
  );
}
