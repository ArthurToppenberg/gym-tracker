import { Badge } from "@gym/ui/components/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DeltaIndicatorProps {
  startValue: number;
  endValue: number;
}

const DeltaIndicator = ({ startValue, endValue }: DeltaIndicatorProps) => {
  const delta = endValue - startValue;

  if (delta === 0) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <span className="text-gray-400">—</span>
      </Badge>
    );
  }

  const isPositive = delta > 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const color = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <Icon className={color} />
      <span>
        {isPositive ? "+" : ""}
        {delta}
      </span>
    </Badge>
  );
};

export default DeltaIndicator;
