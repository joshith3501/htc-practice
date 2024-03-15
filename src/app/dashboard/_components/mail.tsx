"use client";
import Link from "next/link";
import { MdOutlinePostAdd } from "react-icons/md";
import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  Earth,
  File,
  Inbox,
  MessagesSquare,
  PackagePlus,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { DoctorNav, userNav } from "@/lib/roleBasedNav";

import { AccountSwitcher } from "./account-switcher";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";
import { Nav } from "./nav";
// import { Mail } from "../data";
import { useMail } from "../use-mail";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

import { ethers } from "ethers";
import UserApprovalsTab from "./userApprovalsTab";

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

interface MailProps {
  mails: DataProps;
  role: String;
  walletAddress: String;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

interface IMail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels: string[];
}

export function Mail({
  mails,
  role,
  walletAddress,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();
  const [status, setStatus] = React.useState<String>("Current");
  const [currentMail, setCurrentMail] = React.useState<IMail>();
  const [currentType, setCurrentType] = React.useState("approvals");

  // const getComponent = () => {
  //   // if (role === "DOCTOR") {
  //   console.log(role === '"DOCTOR"');
  //   console.log(role);
  //   // }
  // };

  // getComponent();

  const handleMailRecordClick = (data:any,type:string)=>{
    if (type === "approvals") {
      setCurrentMail( {
        id: data.id,
        name: data.patientAddress,
        email: data.doctorAddress,
        subject: data.guardianAddress,
        text: data.treatmentDetails,
        date: data.createdAt,
        read: false,
        labels: [""],
      });

      setCurrentType("approvals");
    }
  }

  const getTabs = () => {
    return (
      <Tabs defaultValue="all">
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Inbox</h1>
          {/* <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList> */}
        </div>
        <Separator />
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
        <TabsContent value="all" className="m-0">
          <MailList items={mails} handleRecordClick={handleMailRecordClick} />
        </TabsContent>
        {/* <TabsContent value="unread" className="m-0">
          <MailList items={mails.filter((item) => !item.read)} />
          <MailList items={mails} />
        </TabsContent> */}
      </Tabs>
    );
  };
  const getComponent = () => {
    switch (status) {
      case "Current":
        return getTabs();
      case "Approvals":
        return <UserApprovalsTab handleRecordClick={handleMailRecordClick}/>;
      case "Approved":
        return <Tabs>Approved</Tabs>;
      case "Archive":
        return <Tabs>Archives</Tabs>;
      default:
        return null;
    }
  };

  const handleNavLink = (name: String) => {
    setStatus(name);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[675px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            // document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            //   true
            // )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            // document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            //   false
            // )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          {/* <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          > */}
          {/* <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div> */}
          {/* <Separator /> */}
          {/* form button */}
          {/* {isCollapsed ? (
            // <button
            //   data-tooltip="Add new mail"
            //   className="flex items-center bg-mygreen border-none rounded-sm hover:opacity-90 pl-2 pr-1 py-2 m-auto relative"
            // >
            //   <MdOutlinePostAdd className="text-lg mr-1" />
            // </button>

            <Tooltip key="add" delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="/mail/form"
                  className={cn(
                    buttonVariants({ variant: "default", size: "icon" }),
                    "m-auto h-9 w-9 dark:bg-mygreen dark:text-white dark:hover:opacity-90 flex  items-center"
                  )}
                >
                  <MdOutlinePostAdd className=" h-5 w-5" />
                  <span className="sr-only">Add New </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                Add New
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link href="/mail/form">
              <span className="flex justify-between items-center px-7 py-2 text-sm">
                To add
                <button className="flex items-center bg-mygreen border-none rounded-sm hover:opacity-90 px-2 py-1 text-xs">
                  <MdOutlinePostAdd className="text-lg mr-1" />
                  New
                </button>
              </span>
            </Link>
          )} */}
          {/* {
            role === 'DOCTOR' && (isCollapsed?console.log("true"): console.log("false"))
          } */}
          {/* getComponent() */}
          <nav className="grid gap-1 mt-5 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            {role === '"DOCTOR"' &&
              (isCollapsed ? (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href="/createForm"
                      className={cn(
                        buttonVariants({ variant: "default", size: "icon" }),
                        // "h-9 w-9",
                        // link.variant === "default" //&&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <PackagePlus />
                      <span className="sr-only">Add Record</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    Add Record
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  href="/createForm"
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" }),
                    // link.variant === "default" &&
                    //   "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start"
                  )}
                >
                  <PackagePlus />
                  Add Record
                </Link>
              ))}
          </nav>
          <Nav
            isCollapsed={isCollapsed}
            links={role === '"USER"' ? userNav : DoctorNav}
            handleNavClicks={handleNavLink}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Global",
                href: "/dashboard/global",
                icon: Earth,
                variant: "ghost",
              },
            ]}
          />
          {/* <Link href="/dashboard/global" buttonVariant({variant: "ghost"})>global</Link> */}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {getComponent()}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          {/* <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          /> */}
          <MailDisplay
            mail={currentMail || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
