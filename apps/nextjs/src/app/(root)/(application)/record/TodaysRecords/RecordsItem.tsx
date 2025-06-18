import React from "react";
import DeltaIndicator from "../CreateRecord/DeltaIndicator";

interface RecordsItemProps {
  label: string;
  startValue: number;
  endValue: number;
}

const RecordsItem: React.FC<RecordsItemProps> = ({
  label,
  startValue,
  endValue,
}) => (
  <div className="space-y-1">
    <div className="flex items-center justify-start gap-2">
      <p className="text-muted-foreground text-sm">{label}</p>
      <DeltaIndicator startValue={startValue} endValue={endValue} />
    </div>
    <p className="font-medium">
      {startValue} - {endValue}
    </p>
  </div>
);

export default RecordsItem;
