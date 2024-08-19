import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/backoffice/AdminSidebar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="relative ">
      <AdminNavbar className={"py-2 sm:py-3 px-4 sm:px-36"} />
      <div className="sm:mx-auto sm:max-w-7xl px-4 mt-4">
        <div className="lg:grid lg:grid-cols-12 gap-4 w-full border bg-card py-2 px-2 rounded-sm">
          <div className="hidden lg:block lg:col-span-2 relative">
            <AdminSidebar />
          </div>
          <div className="lg:col-span-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
