import { CgArrowBottomRight, CgArrowTopRight } from "react-icons/cg";
import { cn } from "@/lib/tw";

import { type CryptoTableData } from "@/utils/types";
import { type Row } from "@tanstack/react-table";
import { useMemo } from "react";

interface ChangeCellProps {
  row: Row<CryptoTableData>;
}

export const ChangeCell = ({ row }: ChangeCellProps) => {
  const changePercent = parseFloat(row.original.priceChangePercent24h);

  const Arrow = useMemo(() => {
    if (changePercent > 0) {
      return <CgArrowTopRight />;
    } else if (changePercent < 0) {
      return <CgArrowBottomRight />;
    } else {
      return null;
    }
  }, [changePercent]);

  const arrowColor = useMemo(() => {
    if (changePercent > 0) {
      return "text-green-500";
    } else if (changePercent < 0) {
      return "text-red-500";
    } else {
      return "text-neutral-500";
    }
  }, [changePercent]);

  return (
    <div className={cn("flex flex-row flex-nowrap items-center justify-end", arrowColor)}>
      <div className="text-xl">{Arrow}</div>
      <span className={cn("font-bold")}>{Math.abs(changePercent).toFixed(2)} %</span>
    </div>
  );
};
