"use client";

import { Pie, PieChart } from "recharts";
import { useMemo } from "react";
import { LabelList } from "recharts";

import {
  ChartContainer as Chart,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@gym/ui/components/chart";
import type { ChartConfig } from "@gym/ui/components/chart";
import ChartContainer from "./components/ChartContainer";
import dayjs from "dayjs";

export const description = "A pie chart with a label";

export interface PieChartLabelProps {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  data: {
    name: string;
    value: number;
  }[];
  isLoading?: boolean;
}

const PieChartLable = ({
  title,
  description,
  data,
  startDate,
  endDate,
  isLoading,
}: PieChartLabelProps) => {
  const chartData = useMemo(
    () =>
      data.map((item, idx) => ({
        browser: item.name,
        visitors: item.value,
        fill: `var(--chart-${(idx % 5) + 1})`,
      })),
    [data],
  );

  const chartConfig = useMemo(
    () =>
      data.reduce(
        (acc, item, idx) => {
          acc[item.name] = {
            label: item.name,
            color: `var(--chart-${(idx % 5) + 1})`,
          };
          return acc;
        },
        {
          visitors: { label: "Visitors" },
        } as Record<string, { label: string; color?: string }>,
      ),
    [data],
  ) as ChartConfig;

  // Find the largest 3 sections by value
  const top3Browsers = useMemo(() => {
    return chartData
      .slice()
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 3)
      .map((item) => item.browser);
  }, [chartData]);

  return (
    <ChartContainer
      title={title}
      description={description}
      startDate={dayjs(startDate).toISOString()}
      endDate={dayjs(endDate).toISOString()}
      isLoading={isLoading}
    >
      <Chart
        config={chartConfig}
        className="mx-auto aspect-square max-h-[300px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartData} dataKey="visitors" nameKey="browser">
            <LabelList
              dataKey="browser"
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={(value: string) =>
                top3Browsers.includes(value) ? chartConfig[value]?.label : ""
              }
            />
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="browser" />}
            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
          />
        </PieChart>
      </Chart>
    </ChartContainer>
  );
};

export default PieChartLable;
