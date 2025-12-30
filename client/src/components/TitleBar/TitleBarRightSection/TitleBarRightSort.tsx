import { useRef, useState } from "react";
import { Dropdown } from "../../Dropdown/Dropdown";
import { Sort } from "../../Sort/Sort";
import type { Sortable, SortOption } from "../../Sort/types";


type TitleBarRightSortProps = {
    sortable?: Sortable[]
    onSortChange?: (sortOptions: SortOption[]) => void
}

export const TitleBarRightSort = ({ sortable, onSortChange }: TitleBarRightSortProps) => {
    const sortButtonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);


    const [sortOptions, setSortOptions] = useState<SortOption[]>([]);

    const handleSortChange = (sortOptions: SortOption[]) => {
        setSortOptions(sortOptions)
        onSortChange && onSortChange(sortOptions)
    }

    const handleButtonClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <button ref={sortButtonRef} onClick={handleButtonClick}>Sort</button>
            <Dropdown key="sort-dropdown" onClose={handleClose} open={open} anchorEl={sortButtonRef}>
                <Sort sortable={sortable} onSortChange={handleSortChange} value={sortOptions} />
            </Dropdown>
        </div>
    )
}