"use client";

import { Book, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = " ";

const chartData = [
  { month: "ม.ค.", book: 186 },
  { month: "ก.พ.", book: 305 },
  { month: "มี.ค.", book: 237 },
  { month: "เม.ย.", book: 73 },
  { month: "พ.ค.", book: 209 },
  { month: "มิ.ย.", book: 214 },
];

const chartConfig = {
  book: {
    label: "หนังสือ",
    color: "hsl(var(--chart-1))",
  },
};

export function BarChartDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>จำนวนการยืมหนังสือ</CardTitle>
        <CardDescription> มกราคม - มิถุนายน 2024</CardDescription>
      </CardHeader>
      <CardContent className="p-3">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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
            <Bar dataKey="book" fill="var(--color-book)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-muted-foreground">
          <Book className="h-3 w-3" /> จำนวนหนังสือ
        </div>
      </CardFooter> */}
    </Card>
  );
}
