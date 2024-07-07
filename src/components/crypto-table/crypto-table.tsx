"use client";

import { DataTable } from "@/components/ui/data-table";
import { useTable } from "@/hooks/useTable";
import { useCryptoData } from "@/hooks/useCryptoData";
import { tableColumns } from "./columns/table-columns";
import { useState } from "react";

export const CryptoTable = () => {
  const { cryptoTableData, isLoading, isError, error } = useCryptoData();
  const [meta, setMeta] = useState({ chartDataInterval: "15m", chartDataIntervalMs: 900000 });

  const table = useTable(cryptoTableData, tableColumns, {
    disableFiltering: true,
    disableRowSelection: true,
    disableSorting: true,
    meta,
  });

  if (isError) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-white rounded-md border gap-4">
        <p className="text-lg">There was an error fetching the data. Please try again later.</p>
        <p className="font-semibold text-2xl text-red-500">Details: {error?.message}</p>
      </div>
    );
  }

  return <DataTable table={table} isLoading={isLoading} meta={meta} setMeta={setMeta} />;
};
