// sidebarLinks.js
import {
    Album,
    Book,
    BookCheck,
    BookText,
    Heart,
    House,
    MessageSquareText,
    SquareLibrary,
  } from "lucide-react";
  
  export const sidebarLinks = [
    {
      title: "หน้าหลัก",
      icon: House,
      href: "/home",
    },
    {
      title: "หนังสือทั้งหมด",
      icon: BookText,
      href: "/books",
    },
    {
      title: "หนังสือยอดนิยม",
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