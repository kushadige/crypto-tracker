"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

import { type Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export const DataTablePagination = <TData,>({ table }: DataTablePaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-between bg-neutral3 p-4 border rounded-md mt-4">
      <div className="text-sm font-medium min-w-[7rem]">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-7 w-7 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <MdKeyboardDoubleArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-7 w-7 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <MdKeyboardArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-7 w-7 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <MdOutlineKeyboardArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-7 w-7 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <MdOutlineKeyboardDoubleArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[9.375rem] bg-white">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
