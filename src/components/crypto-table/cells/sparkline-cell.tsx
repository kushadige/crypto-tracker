import { CgSpinnerTwoAlt } from "react-icons/cg";
import { SparkLineChart } from "@/components/ui/sparkline";
import { useKlinesData } from "@/hooks/useKlinesData";

import { type CryptoTableData } from "@/utils/types";
import { type Row } from "@tanstack/react-table";

interface SparklineCellProps {
  row: Row<CryptoTableData>;
  chartDataInterval: string;
  chartDataIntervalMs: number;
}

export const SparklineCell = ({ row, chartDataInterval, chartDataIntervalMs }: SparklineCellProps) => {
  const symbol = row.original.crypto.symbol;

  const { klines, isLoading, isError, error } = useKlinesData(symbol, chartDataInterval, chartDataIntervalMs);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <CgSpinnerTwoAlt className="animate-spin h-4 w-4" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center">
        <p className="text-xs text-red-500">Error: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="h-8 flex flex-row justify-center">
      <SparkLineChart data={klines} percentageChange={parseFloat(row.original.priceChangePercent24h)} />
    </div>
  );
};
