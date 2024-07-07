import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/utils/formatter";
import { cn } from "@/lib/tw";

import { type CryptoTableData } from "@/utils/types";
import { type Row } from "@tanstack/react-table";

interface PriceCellProps {
  row: Row<CryptoTableData>;
}

export const PriceCell = ({ row }: PriceCellProps) => {
  const lastPrice = useRef<string | undefined>();
  const [animateClass, setAnimateClass] = useState("");

  useEffect(() => {
    if (lastPrice.current && lastPrice.current < row.original.lastPrice) {
      setAnimateClass("animate-highlight-green");
    } else if (lastPrice.current && lastPrice.current > row.original.lastPrice) {
      setAnimateClass("animate-highlight-red");
    }

    lastPrice.current = row.original.lastPrice;
  }, [row.original.lastPrice]);

  return (
    <div
      className={cn("flex flex-nowrap items-end justify-end gap-1", animateClass)}
      onAnimationEnd={(e) => {
        if (animateClass) {
          e.currentTarget.classList.remove(animateClass);
          setAnimateClass("");
        }
      }}
    >
      <span className="font-bold">{formatPrice(row.original.lastPrice)}</span>
      <span className="text-xs">USDT</span>
    </div>
  );
};
