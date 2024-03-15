"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    //I might implement this later
  }
  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};
