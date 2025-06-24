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
}

const ChartContainer = ({
  title,
  description,
  children,
  startDate,
  endDate,
  footer,
}: ChartContainerProps) => {
  const startWeekDay = startDate ? dayjs(startDate).format("ddd D") : null;
  const endWeekDay = endDate ? dayjs(endDate).format("ddd D") : null;

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
