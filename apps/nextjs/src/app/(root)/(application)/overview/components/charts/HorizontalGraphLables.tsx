"use client";

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
import ChartContainer from "./components/ChartContainer";

export interface HorizontalGraphLablesProps {
  title: string;
  description: string;
  data: {
    date: Date;
    name: string;
    value: number;
  }[];
  valueLabel: string;
  startDate: Date;
  endDate: Date;
  isLoading?: boolean;
}

const HorizontalGraphLables = ({
  isLoading,
  title,
  description,
  data,
  valueLabel,
  startDate,
  endDate,
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

  const chartData = useMemo(() => {
    return data.map((item) => ({
      day: dayjs(item.date).format("ddd"),
      date: item.date,
      name: item.name,
      value: item.value,
    }));
  }, [data]);

  return (
    <ChartContainer
      title={title}
      description={description}
      startDate={dayjs(startDate).toISOString()}
      endDate={dayjs(endDate).toISOString()}
      isLoading={isLoading}
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
