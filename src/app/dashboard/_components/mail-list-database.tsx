import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import React from "react";

interface UserApprovalTreatmentData {
  id: string;
  patientAddress: string;
  doctorAddress: string;
  guardianAddress: string;
  treatmentDetails: string;
  treatmentTitle: string;
  treatmentCourse: string[];
  createdAt: Date;
  published: boolean;
  archived: boolean;
}

interface MailListDatabaseProps {
  treatments: UserApprovalTreatmentData[] | undefined;
  handleRecordClick: (data: any, type: string) => void;
}

const MailListDatabase = ({
  treatments,
  handleRecordClick,
}: MailListDatabaseProps) => {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {treatments?.map((treatment, index) => (
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
            onClick={() => handleRecordClick(treatment, "approvals")}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    {treatment.treatmentTitle}
                  </div>
                  {/* {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )} */}
                </div>
                {/* <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item[0]
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                > */}
                <div className={cn("ml-auto text-xs", "text-foreground")}>
                  {formatDistanceToNow(new Date(treatment.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">
                for patient: {treatment.patientAddress}
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              by doctor: {treatment.doctorAddress}
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
};

export default MailListDatabase;
