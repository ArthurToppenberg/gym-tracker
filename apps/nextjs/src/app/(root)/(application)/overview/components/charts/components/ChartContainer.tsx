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
import { cn } from "@gym/ui/lib/utils";

export interface ChartContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  startDate?: string;
  endDate?: string;
  footer?: React.ReactNode;
  variant?: "default" | "pie";
}

const ChartContainer = ({
  title,
  description,
  children,
  startDate,
  endDate,
  footer,
  variant = "default",
}: ChartContainerProps) => {
  const startWeekDay = startDate ? dayjs(startDate).format("ddd D") : null;
  const endWeekDay = endDate ? dayjs(endDate).format("ddd D") : null;

  return (
    <Card className={cn({ "flex flex-col": variant === "pie" })}>
      <CardHeader className={cn({ "items-center pb-0": variant === "pie" })}>
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
      <CardContent className={cn({ "flex-1 pb-0": variant === "pie" })}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter
          className={cn("flex-col gap-2 text-sm", {
            "items-start": variant === "default",
          })}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default ChartContainer;
