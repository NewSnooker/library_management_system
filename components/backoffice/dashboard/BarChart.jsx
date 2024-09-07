"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getData } from "@/lib/getData"; // Adjust this import to your actual data fetching function
import { Skeleton } from "@/components/ui/skeleton";

const years = [2026, 2025, 2024, 2023, 2022]; // Add or adjust years as needed

export function BarChartDemo() {
  const [selectedYear, setSelectedYear] = useState(2024);

  const { data, isLoading, error } = useQuery({
    queryKey: ["monthly-borrow-data", selectedYear],
    queryFn: () => getData(`admin/borrows/monthly?year=${selectedYear}`), // Adjust the endpoint to match your API
  });

  if (isLoading)
    return (
      <div>
        {" "}
        <Skeleton className="w-full h-96 mb-2 " />
      </div>
    );
  if (error) return <div>Error fetching data</div>;

  const chartData = data || []; // Fallback to empty array if no data

  const chartConfig = {
    book: {
      label: "หนังสือ",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>จำนวนการยืมหนังสือ</CardTitle>
        <div className="flex justify-between">
          <CardDescription>1 มกราคม - 31 ธันวาคม </CardDescription>
          <CardDescription>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
              className="px-1 border rounded"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
              tick={{ fill: "white" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-book)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
