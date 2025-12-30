
import type { Filterable, FilterStore } from "../Filter/type";
import type { Sortable, SortOption } from "../Sort/types";
import styles from "./TitleBar.module.css";
import { TitleBarLeftSection } from "./TitleBarLeftSection/TitleBarLeftSection";
import { TitleBarRightSection } from "./TitleBarRightSection/TitleBarRightSection";


type TitleBarProps = {
    onSortChange?: (sortOptions: SortOption[]) => void;
    onFilterChange?: (store: FilterStore) => void;
    title?: string;
    filterable?: Filterable[] 
    sortable?: Sortable[]
}


export const TitleBar = ({onSortChange, onFilterChange, sortable = [], filterable = [], title}: TitleBarProps) => {

    return (
        <div className={styles.titleBar}>
            <TitleBarLeftSection>
               {title}
            </TitleBarLeftSection>
            <TitleBarRightSection filterable={filterable} sortable={sortable} onSortChange={onSortChange} onFilterChange={onFilterChange} />
        </div>
    )
}