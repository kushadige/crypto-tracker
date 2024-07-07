"use client";

import { flexRender, type Table as TableType } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { Skeleton } from "../skeleton";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableProps<TData> {
  table: TableType<TData>;
  isLoading?: boolean;
  disablePagination?: boolean;
  meta: { chartDataInterval: string; chartDataIntervalMs: number };
  setMeta: (meta: { chartDataInterval: string; chartDataIntervalMs: number }) => void;
}

export function DataTable<TData>({ table, isLoading, disablePagination, meta, setMeta }: DataTableProps<TData>) {
  return (
    <>
      <div className="mb-4 flex justify-end">
        <DataTableFacetedFilter
          title="Chart Interval"
          options={[
            { label: "1s", value: "1s", ms: 1000 },
            { label: "1m", value: "1m", ms: 60000 },
            { label: "3m", value: "3m", ms: 180000 },
            { label: "5m", value: "5m", ms: 300000 },
            { label: "15m", value: "15m", ms: 900000 },
            { label: "30m", value: "30m", ms: 1800000 },
            { label: "1h", value: "1h", ms: 3600000 },
            { label: "2h", value: "2h", ms: 7200000 },
            { label: "4h", value: "4h", ms: 14400000 },
            { label: "6h", value: "6h", ms: 21600000 },
            { label: "8h", value: "8h", ms: 28800000 },
            { label: "12h", value: "12h", ms: 43200000 },
            { label: "1d", value: "1d", ms: 86400000 },
            { label: "3d", value: "3d", ms: 259200000 },
            { label: "1w", value: "1w", ms: 604800000 },
            { label: "1M", value: "1M", ms: 2592000000 },
          ]}
          selectedValue={meta.chartDataInterval}
          setSelectedValue={(value, ms) => setMeta({ chartDataInterval: value, chartDataIntervalMs: ms })}
        />
      </div>

      <div className="relative flex-1 overflow-auto bg-white hidden-scroll-y [&>div]:min-h-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-bold whitespace-nowrap"
                      colSpan={header.column.getSize() / 100}
                      style={{
                        width: header.column.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow className="!border-b !border-t">
                {Array.from({ length: table.getAllColumns().length }, (v, i) => (
                  <TableCell
                    key={i}
                    colSpan={table.getAllColumns()[i].getSize() / 100}
                    style={{
                      width: table.getAllColumns()[i].getSize(),
                      padding: "0.75rem",
                    }}
                  >
                    <Skeleton className="h-12 w-full min-w-5 bg-neutral-200" />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        colSpan={cell.column.getSize() / 100}
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length + 1}
                    className="h-48 text-center bg-neutral3 text-neutral-500 font-bold text-lg"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {!disablePagination && table.getRowModel().rows?.length ? <DataTablePagination table={table} /> : null}
    </>
  );
}
