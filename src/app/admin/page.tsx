"use client";
import { useGetAllPlaces } from "@/hooks/admin/usePlace";
import { AdminPlaceInfo } from "@/model/place";
import { weekdays } from "@/utils/getTodayOpeningHours";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function AdminPage() {
  const { data, isLoading } = useGetAllPlaces();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo<ColumnDef<AdminPlaceInfo>[]>(
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
        cell: (props) => {
          return (
            <Link
              href={`/admin/${props.row.original.place_id}`}
              className="underline font-semibold"
            >
              {props.row.original.name}
            </Link>
          );
        },
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
        cell: (props) => {
          let time = JSON.parse(props.row.original.opening_hours!);
          const timeType = ["time_range", "break_time", "last_order"];
          return (
            <>
              {time["매일"] ? (
                <div>
                  <strong>매일</strong>
                  {timeType.map((type, idx) => (
                    <p key={idx}>
                      {type}: {time["매일"][type] ?? "정보 없음"}
                    </p>
                  ))}
                </div>
              ) : (
                <div>
                  {weekdays.map((day, idx) => (
                    <>
                      {time[day] && (
                        <>
                          <strong>{day}</strong>
                          {timeType.map((type, idx) => (
                            <p key={idx}>
                              {type}: {time[day][type] ?? "정보 없음"}
                            </p>
                          ))}
                          <br />
                        </>
                      )}
                    </>
                  ))}
                </div>
              )}
            </>
          );
        },
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
        <div className="break-keep absolute top-14 w-full h-full overflow-y-auto">
          <table className="w-full h-full overflow-y-auto px-8 text-sm">
            {/* thead */}
            <thead className="sticky top-0 border-b-[1px] shadow-sm border-gray-400 bg-white">
              {" "}
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-3 ">
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
