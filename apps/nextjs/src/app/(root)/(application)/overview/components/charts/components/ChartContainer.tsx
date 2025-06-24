import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gym/ui/components/card";
import { Clock } from "lucide-react";
import dayjs from "dayjs";

export interface ChartContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  startDate?: string;
  endDate?: string;
  footer?: React.ReactNode;
  isLoading?: boolean;
}

const ChartContainer = ({
  title,
  description,
  children,
  startDate,
  endDate,
  footer,
  isLoading,
}: ChartContainerProps) => {
  const startWeekDay = startDate ? dayjs(startDate).format("ddd D") : null;
  const endWeekDay = endDate ? dayjs(endDate).format("ddd D") : null;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {title}
            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
          </CardTitle>
          <CardDescription>
            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[250px] w-full flex-col gap-4">
            <div className="bg-muted h-8 w-full animate-pulse rounded" />
            <div className="bg-muted h-8 w-full animate-pulse rounded" />
            <div className="bg-muted h-8 w-full animate-pulse rounded" />
            <div className="bg-muted h-8 w-full animate-pulse rounded" />
            <div className="bg-muted h-8 w-full animate-pulse rounded" />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="bg-muted h-4 w-1/3 animate-pulse rounded" />
          <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {title}
          {startWeekDay && endWeekDay && (
            <span className="text-muted-foreground flex flex-row items-center gap-1 text-xs">
              <Clock className="h-3 w-3" />
              {`${startWeekDay} - ${endWeekDay}`}
            </span>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter className="flex-col gap-2 text-sm">{footer}</CardFooter>
      )}
    </Card>
  );
};

export default ChartContainer;
