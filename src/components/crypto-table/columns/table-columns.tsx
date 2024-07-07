import { CryptoCell } from "../cells/crypto-cell";
import { PriceCell } from "../cells/price-cell";

import { type ColumnDef } from "@tanstack/react-table";
import { type CryptoTableData } from "@/utils/types";
import { ChangeCell } from "../cells/change-cell";
import { SparklineCell } from "../cells/sparkline-cell";

interface TableMeta {
  chartDataInterval: string;
  chartDataIntervalMs: number;
}

export const tableColumns: ColumnDef<CryptoTableData>[] = [
  {
    accessorKey: "crypto",
    header: "Crypto",
    cell: ({ row }) => <CryptoCell row={row} />,
    size: 200,
  },
  {
    accessorKey: "lastPrice",
    header: () => <div className="text-end">Price</div>,
    cell: ({ row }) => <PriceCell row={row} />,
    size: 100,
  },
  {
    accessorKey: "priceChangePercent24h",
    header: "24h Change",
    cell: ({ row }) => <ChangeCell row={row} />,
    size: 100,
  },
  {
    accessorKey: "chartData",
    header: "",
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMeta;

      return (
        <SparklineCell
          row={row}
          chartDataInterval={meta.chartDataInterval}
          chartDataIntervalMs={meta.chartDataIntervalMs}
        />
      );
    },
    size: 180,
  },
];
