"use client";
import { useGetAllPlaces } from "@/hooks/admin/usePlace";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";

type Place = {
  place_id: Number;
  name: string;
  address: string;
  content: string | null;
  opening_hours: string | null;
  closed_days: string | null;
  phone: string | null;
  cate_name: string;
};

export default function AdminPage() {
  const { data, isLoading } = useGetAllPlaces();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo<ColumnDef<Place>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            id="header-select"
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            id={`select-${row.id}`}
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 30,
      },
      {
        accessorKey: "place_id",
        header: "ID",
        accessorFn: (row) => row.place_id,
        size: 30,
      },
      {
        accessorKey: "name",
        header: () => "식당 이름",
        accessorFn: (row) => row.name,
        size: 80,
      },
      {
        accessorKey: "address",
        header: () => "주소",
        accessorFn: (row) => row.address,
        size: 100,
      },
      {
        accessorKey: "content",
        header: () => "소개 내용",
        accessorFn: (row) => row.content,
      },
      {
        accessorKey: "opening_hours",
        header: () => "영업 시간",
        accessorFn: (row) => row.opening_hours,
      },
      {
        accessorKey: "closed_days",
        header: () => "휴무일",
        accessorFn: (row) => row.closed_days,
        size: 50,
      },
      {
        accessorKey: "phone",
        header: () => "전화번호",
        accessorFn: (row) => row.phone,
        size: 100,
      },
      {
        accessorKey: "cate_name",
        header: () => "카테고리",
        accessorFn: (row) => row.cate_name,
        size: 100,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection, columnFilters },
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <>
      {isLoading && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <ClipLoader color="black" />
        </div>
      )}
      {data && (
        <div className="mt-16 break-keep">
          <table className="w-full h-fit px-8 text-sm">
            {/* thead */}
            <thead className="border-b-[1px] border-gray-400">
              {" "}
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-3">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* tbody */}
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b-[1px] border-gray-400">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        width: `${cell.column.getSize()}px`,
                      }}
                      className="text-center py-2"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {/* pagination */}
          </table>
          {table.getState().pagination.pageIndex + 1}
          {table.getPageCount()}
        </div>
      )}
    </>
  );
}
