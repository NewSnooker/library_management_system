import Navbar from "@/components/Navbar";

// app/(front-end)/login/layout.js
export default function Layout({ children }) {
  return (
    <div className="relative">
      <Navbar className={"py-2 sm:py-3 px-4 sm:px-60"} />
      <div className="
         absolute inset-0 
      ">
        <div>{children}</div>
      </div>
    </div>
  );
}
