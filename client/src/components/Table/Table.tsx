import { HeaderCell } from "./HeaderCell/HeaderCell";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { useDnD } from "./hooks/useDnD";

import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import {
  closestCenter,
  DndContext,
} from '@dnd-kit/core'

import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'



type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
}

export const Table = <T,>({ data, columns }: TableProps<T>) => {

  const { sensors, columnOrder, setColumnOrder, onDragEnd } = useDnD({ columns });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    columnResizeMode: 'onChange',
  });

  return (
    <DndContext collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]} sensors={sensors} onDragEnd={onDragEnd}>
      <div className="p-2">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                  {headerGroup.headers.map((header) => (
                    <HeaderCell key={header.column.id} 
                    id={header.column.id} 
                    label={header.column.columnDef.header! as string} 
                    onResize={header.getResizeHandler()} 
                    width={header.column.getSize()} />
                  ))}
                </SortableContext>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DndContext>
  )
}