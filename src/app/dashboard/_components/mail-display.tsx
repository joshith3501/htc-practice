"use client";
import addDays from "date-fns/addDays";
import addHours from "date-fns/addHours";
import format from "date-fns/format";
import nextSaturday from "date-fns/nextSaturday";
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { Mail } from "../data";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "@/lib/constant";
import React from "react";
import { addTreatmentToBlockchain } from "@/actions/addtreatmenttochain";
import { useRouter } from "next/navigation";
// import router, { useRouter } from "next/router";

interface IMail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels: string[];
  treatmentTitle?: string;
  treatmentCourse?: any;
}

interface MailDisplayProps {
  mail: IMail | null;
  currentType: string;
}

export function MailDisplay({ mail, currentType }: MailDisplayProps) {
  const today = new Date();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const getEthereumContract = async (signerAddress: any) => {
    // console.log(signerAddress);

    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signerAddress
    );

    return contract;
  };

  const handleSend = async () => {
    setIsLoading(true);
    const signerAddress = await provider.getSigner();
    const transactionContract = await getEthereumContract(signerAddress);

    const transactionHash = await transactionContract.recordTreatment(
      signerAddress,
      mail?.name,
      mail?.subject,
      mail?.treatmentTitle,
      mail?.text,
      mail?.treatmentCourse
    );

    const tx = await transactionHash.wait();

    addTreatmentToBlockchain(mail, JSON.stringify(tx)).then((data) => {
      console.log(data);
    });
    console.log(mail);
    setIsLoading(false);

    // await router.reload();
  };

  console.log(mail?.treatmentCourse);

  return isLoading ? (
    <div> Transaction Processing</div>
  ) : (
    <div className="flex h-full flex-col">
      {currentType !== "approvals" && (
        <div className="flex items-center p-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Archive className="h-4 w-4" />
                  <span className="sr-only">Archive</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
            {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ArchiveX className="h-4 w-4" />
                <span className="sr-only">Move to junk</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to junk</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip> */}
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <Popover>
                <PopoverTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={!mail}>
                      <Clock className="h-4 w-4" />
                      <span className="sr-only">Snooze</span>
                    </Button>
                  </TooltipTrigger>
                </PopoverTrigger>
                <PopoverContent className="flex w-[535px] p-0">
                  <div className="flex flex-col gap-2 border-r px-2 py-4">
                    <div className="px-4 text-sm font-medium">Snooze until</div>
                    <div className="grid min-w-[250px] gap-1">
                      <Button
                        variant="ghost"
                        className="justify-start font-normal"
                      >
                        Later today{" "}
                        <span className="ml-auto text-muted-foreground"></span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start font-normal"
                      >
                        Tomorrow
                        <span className="ml-auto text-muted-foreground"></span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start font-normal"
                      >
                        This weekend
                        <span className="ml-auto text-muted-foreground"></span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start font-normal"
                      >
                        Next week
                        <span className="ml-auto text-muted-foreground"></span>
                      </Button>
                    </div>
                  </div>
                  <div className="p-2">
                    <Calendar />
                  </div>
                </PopoverContent>
              </Popover>
              <TooltipContent>Snooze</TooltipContent>
            </Tooltip>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Forward className="h-4 w-4" />
                <span className="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip> */}
          </div>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              <DropdownMenuItem>Star thread</DropdownMenuItem>
              <DropdownMenuItem>Add label</DropdownMenuItem>
              <DropdownMenuItem>Mute thread</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <Separator />
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail.treatmentTitle}</div>
                <div className="line-clamp-1 text-xs">
                  Patient Address:- {mail.name}
                </div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Acting Doctor:- </span>
                  {mail.email}
                </div>
              </div>
            </div>
            {mail.date && (
              <div className="ml-auto text-xs text-muted-foreground"></div>
            )}
          </div>
          <Separator />
          <div className="p-4 text-xl">
            <h1 className="font-bold">Treatment Impressions</h1>
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail.text}
          </div>
          <Separator />
          <div className="p-4 text-xl">
            <h1 className="font-bold">Suggested Course</h1>
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail.treatmentCourse.map((item:any) => {
                return <div>{item}</div>
            })}
            {console.log(mail.treatmentCourse)}
          </div>
          {/* {mail.treatmentCourse!.map((item, index) => {

          })} */}
          <Separator className="mt-auto" />
          <div className="p-4">
            {/* <form> */}
            <div className="grid gap-4">
              {/* <Textarea
                  className="p-4"
                  placeholder={`Reply ${mail.name}...`}
                /> */}
              <div className="flex items-center">
                {/* <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Mute thread" /> Mute this
                    thread
                  </Label> */}
                {currentType === "approvals" && (
                  <Button
                    onClick={(e) => handleSend()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                )}
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
