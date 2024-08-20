import AdminSidebar from "@/components/backoffice/AdminSidebar";
import AdminNavbar from "@/components/backoffice/navbar/AdminNavbar";

export default function Layout({ children }) {
  return (
    <div className="relative ">
      <AdminNavbar className={"py-2 sm:py-3 px-4 sm:px-36"} />
      <div className="sm:mx-auto sm:max-w-7xl px-4 mt-4">
        <div className="lg:grid lg:grid-cols-12 gap-2 w-full border bg-card p-2 rounded-sm">
          <div className="hidden lg:block lg:col-span-2 relative">
            <AdminSidebar />
          </div>
          <div className="lg:col-span-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
