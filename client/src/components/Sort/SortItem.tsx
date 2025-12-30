import { useState } from "react";
import { Select } from "../Select/Select"
import styles from "./SortItem.module.css";
import ClearIcon from '@mui/icons-material/Clear';
import type { SortOption, SortDirection } from "./types";


type SortMenuItemProps = {
    sortable: { label: string; value: string }[];
    value: string;
    directionValue: SortDirection;
    onRemove?: () => void;
    onChange?: (sortOption: SortOption) => void;
}


const ascendingDirection = { label: "Ascending", value: "ascending" };
const descendingDirection = { label: "Descending", value: "descending" };


export const SortMenuItem = ({ sortable, value, directionValue, onRemove, onChange }: SortMenuItemProps) => {
    const [selectedValue, setSelectedValue] = useState<string>(value);
    const [selectedDirection, setSelectedDirection] = useState<SortDirection>(directionValue);

    const handleValueChange = (newValue: string) => {
        setSelectedValue(newValue);
        onChange && onChange({ property: newValue, direction: selectedDirection });
    };

    const handleDirectionChange = (direction: string) => {
        setSelectedDirection(direction as SortDirection);
        onChange && onChange({ property: selectedValue, direction: direction as SortDirection });
    };

    return <div className={styles.sortMenuItem}>
        <Select options={sortable} value={selectedValue} onChange={handleValueChange} />
        <Select
         options={[ascendingDirection, descendingDirection]} 
         value={selectedDirection || ascendingDirection.value} 
         onChange={handleDirectionChange} />
         <div onClick={onRemove}><ClearIcon /></div>
    </div>
}