// sidebarLinks.js
import {
    Album,
    Book,
    BookCheck,
    BookText,
    File,
    Heart,
    History,
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
    // {
    //   title: "หนังสือยอดนิยม",
    //   icon: BookCheck,
    //   href: "/books/popular-books",
    // },
    {
      title: "หนังสือใหม่",
      icon: Book,
      href: "/books/new-books",
    },
    {
      title: "หมวดหมู่",
      icon: SquareLibrary,
      href: "/books/categories-books",
    },
    {
      title: "หนังสือของฉัน",
      icon: Album,
      href: "/books/my-books",
    },
    {
      title: "รายการโปรด",
      icon: Heart,
      href: "/books/favorite-books",
    },    
    // {
    //   title: "คู่มือใช้งาน",
    //   icon: File,
    //   href: "/books/sdlc.pdf",
    // },
    // {
    //   title: "ประวัติการรยืมคืน",
    //   icon: History,
    //   href: "/books/history", 
    // },
  
    // {
    //   title: "ติดต่อเรา",
    //   icon: MessageSquareText,
    //   href: "/contact-us",
    // },
  ];