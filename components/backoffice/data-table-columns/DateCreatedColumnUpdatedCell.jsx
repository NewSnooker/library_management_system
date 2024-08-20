import React from "react";
import moment from "moment";
import "moment/locale/th";
moment.locale("th");

export default function DateUpdatedColumnCell({ row, accessorKey }) {
  const createdAt = row.getValue(`${accessorKey}`);
  return <div>{moment(createdAt).calendar()}</div>;
}
