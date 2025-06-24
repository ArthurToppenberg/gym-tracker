"use client";

import { TrendingUp } from "lucide-react";
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
  data: {
    name: string;
    value: number;
    date: Date;
  }[];
}

const PieChartLable = ({ title, description, data }: PieChartLabelProps) => {
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

  const footer = (
    <>
      <div className="flex items-center gap-2 leading-none font-medium">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="text-muted-foreground leading-none">
        Showing total visitors for the last 6 months
      </div>
    </>
  );

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
      footer={footer}
      startDate={startDate}
      endDate={endDate}
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
