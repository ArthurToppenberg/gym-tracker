"use client";

import { Clock, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer as Chart,
  ChartTooltip,
  ChartTooltipContent,
} from "@gym/ui/components/chart";
import type { ChartConfig } from "@gym/ui/components/chart";
import { useMemo } from "react";
import dayjs from "dayjs";
import { Skeleton } from "@gym/ui/components/skeleton";
import ChartContainer from "./components/ChartContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gym/ui/components/card";

export interface HorizontalGraphLablesProps {
  title: string;
  description: string;
  data: {
    date: Date;
    name: string;
    value: number;
  }[];
  valueLabel: string;
  isLoading?: boolean;
}

const HorizontalGraphLables = ({
  title,
  description,
  data,
  valueLabel,
  isLoading,
}: HorizontalGraphLablesProps) => {
  const chartConfig = {
    value: {
      label: valueLabel,
      color: "var(--chart-1)",
    },
    secondary: {
      label: "secondary",
      color: "var(--chart-2)",
    },
    label: {
      color: "var(--background)",
    },
  } satisfies ChartConfig;

  const { startDate, endDate } = useMemo(() => {
    if (!data || data.length === 0) {
      return { startDate: undefined, endDate: undefined };
    }

    const dates = data.map((item) => dayjs(item.date));
    const minDate = dates.reduce((min, date) =>
      date.isBefore(min) ? date : min,
    );
    const maxDate = dates.reduce((max, date) =>
      date.isAfter(max) ? date : max,
    );

    return {
      startDate: minDate.toISOString(),
      endDate: maxDate.toISOString(),
    };
  }, [data]);

  const chartData = useMemo(() => {
    return data.map((item) => ({
      day: dayjs(item.date).format("ddd"),
      date: item.date,
      name: item.name,
      value: item.value,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="flex h-[250px] w-full flex-col gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardFooter>
      </Card>
    );
  }

  const footer = (
    <>
      <div className="flex gap-2 leading-none font-medium">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="text-muted-foreground leading-none">
        Showing total visitors for the last 6 months
      </div>
    </>
  );

  return (
    <ChartContainer
      title={title}
      description={description}
      startDate={startDate}
      endDate={endDate}
      footer={footer}
    >
      <Chart config={chartConfig}>
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
            dataKey="day"
            type="category"
            tickLine={false}
            tickMargin={0}
            axisLine={false}
          />
          <XAxis dataKey="value" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar dataKey="value" layout="vertical" radius={4}>
            {chartData.map((entry) => (
              <Cell
                key={`cell-${entry.date.toString()}`}
                fill={
                  dayjs(entry.date).isSame(dayjs(), "day")
                    ? "var(--color-value)"
                    : "var(--color-secondary)"
                }
                radius={4}
              />
            ))}
            <LabelList
              dataKey="name"
              position="insideLeft"
              offset={8}
              className="fill-(--color-label)"
              fontSize={12}
            />
            <LabelList
              dataKey="value"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </Chart>
    </ChartContainer>
  );
};

export default HorizontalGraphLables;
