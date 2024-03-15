"use server";

import { db } from "@/lib/db";
import { ethers } from "ethers";

import { contractAddress, contractAbi } from "@/lib/constant";

const getEthereumContract = async (address: any) => {
  // const signerAddress = await provider.getSigner();
  // console.log(signerAddress);

  const contract = new ethers.Contract(contractAddress, contractAbi, address);

  return contract;
};

export const getTreatmentData = async () => {
  return;
};

export const getDataFromBlockChain = async (signerAddress: any) => {
  const treatmentContract = await getEthereumContract(signerAddress);

  const transactions = await treatmentContract.getTreatments();

  // const transactionJSON = transactions.map((transaction) => {
  //   transaction.map((value) => {
  //     JSON.stringify(value);
  //   });
  // });

  return transactions;
};
