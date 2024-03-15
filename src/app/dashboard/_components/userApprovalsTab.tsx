import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React, { useState, useEffect } from "react";
import { MailList } from "./mail-list";
import { useSession } from "next-auth/react";
import { getApprovalsforUser } from "@/actions/getapprovaluserdata";
import MailListDatabase from "./mail-list-database";

interface UserApprovalTreatmentData {
  id: string;
  patientAddress: string;
  doctorAddress: string;
  guardianAddress: string;
  treatmentTitle: string;
  treatmentDetails: string;
  createdAt: Date;
  published: boolean;
  archived: boolean;
}

interface UserApprovalTabProps{
  handleRecordClick: (data:string,type:string)=>void;
}

const UserApprovalsTab = ({handleRecordClick}:UserApprovalTabProps) => {
  const session = useSession();

  const [data, setData] = useState<UserApprovalTreatmentData[]>();

  useEffect(() => {
    getApprovalsforUser(session?.data?.user.id).then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Approvals</h1>
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
      {/* <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </form>
      </div> */}
      <TabsContent value="all" className="m-0 mt-4">
        {data?.length ? (
          <MailListDatabase treatments={data} handleRecordClick={handleRecordClick}/>
        ) : (
          <div>No Approval Records By You Yet</div>
        )}
      </TabsContent>
      {/* <TabsContent value="unread" className="m-0">
        <MailList items={mails.filter((item) => !item.read)} />
        <MailList items={mails} />
      </TabsContent> */}
    </Tabs>
  );
};

export default UserApprovalsTab;
