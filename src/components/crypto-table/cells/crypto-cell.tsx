import Image from "next/image";

import { type CryptoTableData } from "@/utils/types";
import { type Row } from "@tanstack/react-table";

interface CryptoCellProps {
  row: Row<CryptoTableData>;
}

export const CryptoCell = ({ row }: CryptoCellProps) => {
  return (
    <div className="flex flex-nowrap gap-2 items-center">
      <div className="relative h-8 w-8 overflow-hidden rounded shrink-0">
        <Image
          fill
          src={row.original.crypto.icon}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={row.original.crypto.assetName}
          priority
        />
      </div>
      <div>
        <div className="whitespace-nowrap">
          <span className="font-bold">{row.original.crypto.baseAsset}</span>
          <span className=" text-gray-400"> / {row.original.crypto.quoteAsset}</span>
        </div>
        <span>{row.original.crypto.assetName}</span>
      </div>
    </div>
  );
};
