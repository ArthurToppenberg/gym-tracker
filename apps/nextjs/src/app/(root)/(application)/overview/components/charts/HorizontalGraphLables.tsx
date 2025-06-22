"use client";

import { Clock, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gym/ui/components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@gym/ui/components/chart";
import type { ChartConfig } from "@gym/ui/components/chart";
import { useMemo } from "react";
import dayjs from "dayjs";

export const description = "A bar chart with a custom label";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

interface HorizontalGraphLablesProps {
  title: string;
  description: string;
  data: {
    date: Date;
    name: string;
    value: number;
  }[];
}

const HorizontalGraphLables = ({
  title,
  description,
  data,
}: HorizontalGraphLablesProps) => {
  const { startWeekDay, endWeekDay } = useMemo(() => {
    if (!data || data.length === 0) {
      return { startWeekDay: null, endWeekDay: null };
    }

    const dates = data.map((item) => dayjs(item.date));
    const startDate = dates.reduce((min, date) =>
      date.isBefore(min) ? date : min,
    );
    const endDate = dates.reduce((max, date) =>
      date.isAfter(max) ? date : max,
    );

    return {
      startWeekDay: startDate.format("ddd D"),
      endWeekDay: endDate.format("ddd D"),
    };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2">
          {title}
          <span className="text-muted-foreground flex flex-row items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            {startWeekDay && endWeekDay && `${startWeekDay} - ${endWeekDay}`}
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default HorizontalGraphLables;
