import { TitleBarRightSort } from "./TitleBarRightSort";
import { TitleBarRightFilter } from "./TitleBarRightFilter";
import type { FilterStore } from "../../Filter/type";
import type { Filterable } from "../../Filter/type";
import type { Sortable, SortOption } from "../../Sort/types";
import styles from "./TitleBarRightSection.module.css"
type TitleBarRightSectionProps = {
    onSortChange?: (sortOptions: SortOption[]) => void;
    onFilterChange?: (store: FilterStore) => void;
    filterable: Filterable[];
    sortable: Sortable[]
}

export const TitleBarRightSection = ({ sortable, filterable, onSortChange, onFilterChange }: TitleBarRightSectionProps) => {
    return <div className={styles.titleBarRightSection}>
        <TitleBarRightSort sortable={sortable} onSortChange={onSortChange} />
        <TitleBarRightFilter filterable={filterable} onFilterChange={onFilterChange} />
    </div>
}