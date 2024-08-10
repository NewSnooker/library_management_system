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
      href: "/books/popular-books",
    },
    {
      title: "หนังสือใหม่",
      icon: Book,
      href: "/books/new-books",
    },
    {
      title: "หนังสือของฉัน",
      icon: Album,
      href: "/books/my-books",
    },
    {
      title: "หนังสือที่ชอบ",
      icon: Heart,
      href: "/books/favorite-books",
    },
    {
      title: "หมวดหมู่",
      icon: SquareLibrary,
      href: "/books/categories-books",
    },
    {
      title: "ติดต่อเรา",
      icon: MessageSquareText,
      href: "/contact-us",
    },
  ];