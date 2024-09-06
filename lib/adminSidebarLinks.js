// sidebarLinks.js
import {
  Album,
  AppWindow,
  Banknote,
  Book,
  BookCheck,
  BookText,
  ChartColumnIncreasing,
  ChartNoAxesColumn,
  ChartPie,
  Heart,
  History,
  House,
  LayoutList,
  MessageSquareText,
  SquareLibrary,
  User,
  UserCog,
} from "lucide-react";

export const adminSidebarLinks = [
  {
    title: "แดชบอร์ด",
    icon: ChartPie ,
    href: "/dashboard",
  },
  {
    title: "ข้อมูลหนังสือ",
    icon: BookText,
    href: "/dashboard/books",
  },
  {
    title: "ข้อมูลหมวดหมู่",
    icon: LayoutList ,
    href: "/dashboard/categories",
  },
  {
    title: "ข้อมูลผู้ใช้",
    icon: User ,
    href: "/dashboard/users",
  },
  {
    title: "ข้อมูลผู้ดูแล",
    icon: UserCog  ,
    href: "/dashboard/admins",
  },
  {
    title: "รายงานการยืมคืน",
    icon: History,
    href: "/dashboard/history",
  },
  // {
  //   title: "เกณท์และค่าปรับ",
  //   icon: Banknote ,
  //   href: "/dashboard/criteria-fines",
  // },
  // {
  //   title: "รายงานและสถิติ",
  //   icon: ChartColumnIncreasing,
  //   href: "/dashboard/reports-statistics",
  // },
  {
    title: "ตั้งค่าแบนเนอร์",
    icon: AppWindow,
    href: "/dashboard/banners",
  },
];
