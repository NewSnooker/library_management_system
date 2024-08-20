import React from "react";
import { getData } from "@/lib/getData";
import Heading from "@/components/backoffice/Heading";
import DataTable from "@/components/backoffice/data-table-components/DataTable";
import { columns } from "./columns";
export const dynamic = "force-dynamic";

const page = async () => {
  const customers = await getData("books");
  return (
    <div className="mt-8">
      <Heading title="Customers" />
      <div className="py-8">
        <DataTable
          data={customers}
          columns={columns}
          filterKeys={["name", "email", "createdAt"]}
        />
      </div>
    </div>
  );
};
export default page;
