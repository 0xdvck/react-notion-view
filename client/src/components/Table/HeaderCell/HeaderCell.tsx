import clsx from "clsx";
import styles from "./HeaderCell.module.css";
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';



type HeaderCellProps = {
    id: string;
    label: string;
    onResize?: (event: React.MouseEvent<HTMLDivElement>) => void;
    width?: number;
}


export const HeaderCell = ({ id, label, width, onResize }: HeaderCellProps) => {
    const { attributes, isDragging, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: id,
        })

    const dragStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: isDragging ? width : undefined,
    };

    const resizeStyle = {
        width: width,
    }

    return (
        <th key={id} className={clsx({ [styles.isDragging]: isDragging })}
            style={resizeStyle}
        >
            <div className={styles.headerCell} style={dragStyle}>
                <div className={styles.label} ref={setNodeRef} {...attributes} {...listeners}>{label}</div>
                <div className={styles.verticalDivider} onMouseDown={onResize}></div>
            </div>
        </th>)
}