import { renderHook } from "@testing-library/react";
import { useTable } from "./useTable";

describe("useTable", () => {
  it("disables pagination when disablePagination is true", () => {
    const { result } = renderHook(() => useTable([], [], { disablePagination: true }));
    expect(result.current.options.getPaginationRowModel).toBeUndefined();
  });

  it("disables sorting when disableSorting is true", () => {
    const { result } = renderHook(() => useTable([], [], { disableSorting: true }));
    expect(result.current.options.enableSorting).toBe(false);
  });

  it("disables filtering when disableFiltering is true", () => {
    const { result } = renderHook(() => useTable([], [], { disableFiltering: true }));
    expect(result.current.options.getFilteredRowModel).toBeUndefined();
  });

  it("disables row selection when disableRowSelection is true", () => {
    const { result } = renderHook(() => useTable([], [], { disableRowSelection: true }));
    expect(result.current.options.enableRowSelection).toBe(false);
  });

  it("disables multi row selection when disableMultiRowSelection is true", () => {
    const { result } = renderHook(() => useTable([], [], { disableMultiRowSelection: true }));
    expect(result.current.options.enableMultiRowSelection).toBe(false);
  });

  it("respects custom pageSize", () => {
    const customPageSize = 20;
    const { result } = renderHook(() => useTable([], [], { pageSize: customPageSize }));
    expect(result.current.options.initialState?.pagination?.pageSize).toBe(customPageSize);
  });

  it("passes meta data correctly", () => {
    const mockMeta = { custom: "metaData" };
    const { result } = renderHook(() => useTable([], [], { meta: mockMeta }));
    expect(result.current.options.meta).toEqual(mockMeta);
  });

  it("renders given data and columns correctly", () => {
    const data = [
      { id: 1, name: "Bitcoin" },
      { id: 2, name: "Ethereum" },
    ];
    const columns = [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
    ];
    const { result } = renderHook(() => useTable(data, columns, {}));
    expect(result.current.options.data).toEqual(data);
    expect(result.current.getRowModel().rows.length).toBe(data.length);
    expect(result.current.getRowModel().rows[0].original).toEqual(data[0]);
    expect(result.current.getRowModel().rows[1].original).toEqual(data[1]);
  });
});
