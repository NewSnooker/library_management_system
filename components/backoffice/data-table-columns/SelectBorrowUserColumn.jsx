"use client";
import { Button } from "@/components/ui/button";
import { selectBorrowUserId } from "@/redux/slices/selectBorrowUserSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function SelectBorrowUserColumn({ userId }) {
  const dispatch = useDispatch();
  return (
    <Button variant="outline" className="min-w-20" onClick={() => dispatch(selectBorrowUserId(userId))}>
      เลือก
    </Button>
  );
}
