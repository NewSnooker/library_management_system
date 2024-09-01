import React from 'react'

export default function NumberColumn({ row, accessorKey }) {
    const number = row.getValue(`${accessorKey}`);
    return (
        <div className=" w-full flex justify-center">
          <div className="">{number.toLocaleString()}</div>
        </div>
      );
}
