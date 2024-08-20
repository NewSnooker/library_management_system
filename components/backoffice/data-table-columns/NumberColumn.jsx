import React from 'react'

export default function NumberColumn({ row, accessorKey }) {
    const number = row.getValue(`${accessorKey}`);
    return <div>{number.toLocaleString()}</div>;
}
