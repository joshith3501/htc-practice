import { Archive, Send, Inbox } from "lucide-react";

export const DoctorNav = [
  {
    title: "Current",
    href: "/dashboard/",
    icon: Inbox,
    variant: "default",
  },
  {
    title: "Pending",
    href: "/dashboard/pending",
    icon: Send,
    variant: "ghost",
  },
  // {
  //   title: "Archive",
  //   href: "/dashboard/archive",
  //   icon: Archive,
  //   variant: "ghost",
  // },
];

export const userNav = [
  {
    title: "Current",
    href: "/dashboard",
    icon: Inbox,
    variant: "ghost",
  },
  {
    title: "Approvals",
    href: "/dashboard/approvals",
    icon: Send,
    variant: "ghost",
  },
  {
    title: "Approved",
    href: "/dashboard/approved",
    icon: Archive,
    variant: "ghost",
  },
  // {
  //   title: "Archive",
  //   href: "/dashboard/archive",
  //   icon: Archive,
  //   variant: "ghost",
  // },
];

// [
//   {
//     title: "Current",
//     href: "/dashboard/",
//     icon: Inbox,
//     variant: "default",
//   },
//   // {
//   //   title: "Drafts",
//   //   label: "9",
//   //   icon: File,
//   //   variant: "ghost",
//   // },
//   {
//     title: "Pending",
//     href: "/dashboard/pending",
//     icon: Send,
//     variant: "ghost",
//   },
//   // {
//   //   title: "Trash",
//   //   label: "",
//   //   icon: Trash2,
//   //   variant: "ghost",
//   // },
//   {
//     title: "Archive",
//     href: "",
//     icon: Archive,
//     variant: "ghost",
//   },
// ];
