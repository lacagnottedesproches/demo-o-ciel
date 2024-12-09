import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import { useState } from "react";
import Metrics from "./Metrics";
import TableStatsPots from "./TableStatsPots";

type ValueRange = Date | null;

type Range = ValueRange | [ValueRange, ValueRange];

const Period = () => {
  const now = new Date();
  const [dateRange, setDateRange] = useState<Range>([
    new Date(now.setFullYear(now.getFullYear() - 1)),
    new Date(),
  ]);

  return (
    <div className="flex flex-col gap-2 border rounded p-5">
      <p className="font-bold text-lg">{"Sur une période"}</p>
      <div className="w-full">
        <DateRangePicker
          onChange={setDateRange}
          value={dateRange}
          locale="fr-FR"
          required
        />
      </div>

      <Metrics
        type_metrics="range"
        ts_start={(dateRange as [ValueRange, ValueRange])[0]?.getTime()}
        ts_end={(dateRange as [ValueRange, ValueRange])[1]?.getTime()}
      />

      <TableStatsPots
        tsStart={(dateRange as [ValueRange, ValueRange])[0]?.getTime()}
        tsEnd={(dateRange as [ValueRange, ValueRange])[1]?.getTime()}
      />
    </div>
  );
};

export default Period;
