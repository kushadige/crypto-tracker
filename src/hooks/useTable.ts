"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  TableMeta,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableOptions<TData> {
  disablePagination?: boolean;
  disableSorting?: boolean;
  disableFiltering?: boolean;
  disableRowSelection?: boolean;
  disableMultiRowSelection?: boolean;
  pageSize?: number;
  meta?: TableMeta<TData>;
}

export const useTable = <TData, TValue>(
  data: TData[],
  columns: ColumnDef<TData, TValue>[],
  options: DataTableOptions<TData>
) => {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: options.pageSize || 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    enableSorting: !options.disableSorting,
    enableRowSelection: !options.disableRowSelection,
    enableMultiRowSelection: !options.disableMultiRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false,
    meta: options.meta,
  });

  if (!options.disableFiltering) {
    table.options.getFilteredRowModel = getFilteredRowModel();
  }

  if (!options.disablePagination) {
    table.options.getPaginationRowModel = getPaginationRowModel();
  }

  if (!options.disableSorting) {
    table.options.getSortedRowModel = getSortedRowModel();
  }

  if (options.meta) {
    table.options.meta = options.meta;
  }

  return table;
};
