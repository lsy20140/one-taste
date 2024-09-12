import { Column, RowData } from "@tanstack/react-table";
import FilterInput from "../FilterInput";
import { ChangeEvent } from "react";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "select";
  }
}
export default function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    column.setFilterValue(e.target.value);
  };

  const OPTIONS = ["전체", "한식", "양식", "돈까스", "피자", "이자카야"];

  return filterVariant === "select" ? (
    <div className="h-fit">
      <select
        onChange={(e) => handleChange(e)}
        value={columnFilterValue?.toString()}
        className="p-2 outline outline-[1px] outline-gray-300 rounded mt-2"
      >
        {OPTIONS.map((option, idx) => (
          <option key={idx} value={option === "전체" ? "" : option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <FilterInput
      onChange={(value) => column.setFilterValue(value)}
      placeholder="검색 내용 입력"
      type="text"
      value={(columnFilterValue as string) ?? ""}
    />
  );
}
