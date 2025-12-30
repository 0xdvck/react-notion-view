import { useState } from "react"
import {
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core'

import { arrayMove } from "@dnd-kit/sortable"
import type { ColumnDef } from "@tanstack/react-table"



export function useDnD<T>({ columns }: { columns: ColumnDef<T>[] }) {
    const [columnOrder, setColumnOrder] = useState<string[]>(() =>
        columns.map((c) => c.id!),
    )

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
    );

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setColumnOrder((columnOrder) => {
                const oldIndex = columnOrder.indexOf(active.id as string)
                const newIndex = columnOrder.indexOf(over.id as string)
                return arrayMove(columnOrder, oldIndex, newIndex)
            })
        }
    }


    return { sensors, columnOrder, setColumnOrder, onDragEnd }
}