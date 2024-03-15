"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
// import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/getUserHooks/getcurrentuser";
const mainNav = () => {
  // useEffect(() => {
  //   const getSession = async () =>
  // })

  const user = getCurrentUser();
  const onClick = () => {
    logout();
  };

  return (
    <nav className="flex justify-between items-center h-14 pr-4 w-full bg-navbg z-1000">
      <Link href="/mail">
        <button className="rounded text-sm px-2.5 py-0.5 ml-4 pb-1 bg-navbtn hover:bg-navbgLight text-zinc-200 hover:text-white">
          Home
        </button>
      </Link>
      {/* <div className="flex items-center bg-navbtn px-4 py-2 rounded">
        <CiSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search here.."
          className="bg-navbtn px-2 text-sm outline-none"
        ></input>
      </div> */}
      {/* <Link href="/profile" className="flex items-center">
        <IoIosNotificationsOutline className="text-xl" />

        <div className="flex items-center text-zinc-300 mx-2">
          <CgProfile className=" text-2xl opacity-90 mx-2" />
        </div>
      </Link> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            // disabled={!mail}
          >
            <div>
              <CircleUserRound />
              {user?.name}
            </div>
            <span className="sr-only">{/* {session} */}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Button
            className="w-full cursor-pointer"
            variant="ghost"
            onClick={onClick}
          >
            <DropdownMenuItem>Logout </DropdownMenuItem>
          </Button>
          {/*} <DropdownMenuItem>Star thread</DropdownMenuItem>
          <DropdownMenuItem>Add label</DropdownMenuItem>
          <DropdownMenuItem>Mute thread</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default mainNav;
