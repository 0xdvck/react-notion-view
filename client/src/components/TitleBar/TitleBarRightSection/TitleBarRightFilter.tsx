import { useRef, useState } from "react";
import { Dropdown } from "../../Dropdown/Dropdown";
import { defaultFilterStore } from "../../Filter/constants";
import { Filter } from "../../Filter/Filter";
import type { Filterable, FilterStore } from "../../Filter/type";

type TitleBarRightFilterProps = {
    filterable: Filterable[];
    onFilterChange?: (store: FilterStore) => void;
}

export const TitleBarRightFilter = ({ filterable, onFilterChange }: TitleBarRightFilterProps) => {
    const filterButtonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

    const [filterStore, setFilterStore] = useState<FilterStore>(defaultFilterStore);

    const handleFilterChange = (filterStore: FilterStore) => {
        setFilterStore(filterStore)
        onFilterChange && onFilterChange(filterStore)
    }

    const handleButtonClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return <div><button ref={filterButtonRef} onClick={handleButtonClick}>Filter</button>
        <Dropdown onClose={handleClose} open={open} anchorEl={filterButtonRef}>
            <Filter
                store={filterStore}
                onFilterChange={handleFilterChange}
                filterable={filterable} />
        </Dropdown>
    </div>
}