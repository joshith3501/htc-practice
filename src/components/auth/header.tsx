import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gay-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold mb-5")}>HTC</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
