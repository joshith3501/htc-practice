"use client";
import { ComponentProps, useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "../data";
import { useMail } from "../use-mail";

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

interface MailListProps {
  items: DataProps;
  handleRecordClick: (data: string, type: string) => void;
  tabs: String;
  role: String;
  walletAddress: String;
}

export function MailList({
  items,
  handleRecordClick,
  tabs,
  role,
  walletAddress,
}: MailListProps) {
  // const [currentItems, setCurrentItems] = React.setState(items);
  const [mail, setMail] = useMail();
  const [currentItems, setCurrentItems] = useState<DataProps>();

  useEffect(() => {
    const getCurrentData = async () => {};
    console.log("tabs", tabs);
    console.log(role);
    switch (tabs) {
      case "Current":
        if (role === '"DOCTOR"') {
          console.log("inside if");
          const newItems = items.filter((item) => {
            console.log(item[0]);
            return item[0] === walletAddress;
          });
          console.log("useEffect newItems", newItems);
          setCurrentItems((prev) => [...newItems]);
        } else {
          console.log("inside else");
          const newItems = items.filter((item) => {
            return item[1] === walletAddress;
          });
          console.log("useEffect newItems", newItems);
          setCurrentItems((prev) => [...newItems]);
        }
        break;
      case "Approved":
        console.log("inside approved case");
        const newItems = items.filter((item) => item[2] === walletAddress);
        setCurrentItems(newItems);
        break;

      default:
        console.log("deafault");
    }
    // console.log("item content", typeof items[0][0]);
    // const newItems = items.filter((item) => item[0] === walletAddress);
    // setCurrentItems(newItems);
  }, [tabs]);
  console.log("current items", currentItems);
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {currentItems?.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
              // mail.selected === item[0] && "bg-muted"
            )}
            // onClick={() =>
            //   setMail({
            //     ...mail,
            //     selected: item[0],
            //   })
            // }
            onClick={() => handleRecordClick("some data", "current")}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item[3]}</div>
                  {/* {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )} */}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    // mail.selected === item[0]
                    //   ?
                    "text-foreground"
                    // : "text-muted-foreground"
                  )}
                >
                  {/* {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })} */}
                </div>
              </div>
              <div className="text-xs font-medium">{item[2]}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item[4].substring(0, 300)}
            </div>
            {/* {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

// function getBadgeVariantFromLabel(
//   label: string
// ): ComponentProps<typeof Badge>["variant"] {
//   if (["work"].includes(label.toLowerCase())) {
//     return "default";
//   }

//   if (["personal"].includes(label.toLowerCase())) {
//     return "outline";
//   }

//   return "secondary";
// }
