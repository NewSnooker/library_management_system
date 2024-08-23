import { Badge } from "@/components/ui/badge";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

export default function IsMeColumn({ row, accessorKey }) {
  const { data: session } = useSession();
  const id = session?.user?.id;
  
  const {
    data: userProfile,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getData(`users/user-profile/${id}`),
  });
  const title = row.getValue(`${accessorKey}`);

  const isMe = userProfile.fullName === title 

  return (
    <div className="space-x-1">
      <span>{title}</span>
      {
        isMe && (
          <Badge variant="outline" className="border-custom-text text-custom-text dark:border-blue-700 dark:text-blue-300">
            ฉัน
          </Badge>
        )
      }
    </div>
  );
}
