// sidebarLinks.js
import {
    Album,
    Book,
    BookCheck,
    Heart,
    House,
    MessageSquareText,
    SquareLibrary,
  } from "lucide-react";
  
  export const sidebarLinks = [
    {
      title: "หน้าหลัก",
      icon: House,
      href: "/books",
    },
    {
      title: "หนังสือที่แนะนำ",
      icon: BookCheck,
      href: "/",
    },
    {
      title: "หนังสือใหม่",
      icon: Book,
      href: "/",
    },
    {
      title: "หนังสือของฉัน",
      icon: Album,
      href: "/",
    },
    {
      title: "หนังสือที่ชอบ",
      icon: Heart,
      href: "/",
    },
    {
      title: "หมวดหมู่",
      icon: SquareLibrary,
      href: "/",
    },
    {
      title: "ติดต่อเรา",
      icon: MessageSquareText,
      href: "/",
    },
  ];