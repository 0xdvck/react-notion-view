export type SortOption = {
    property: string;
    direction: SortDirection;
}

export type SortDirection = 'ascending' | 'descending';

export type Sortable = {
    label: string;
    value: string;
}

export type SortMenuProps = {
    value?: SortOption[];
    sortable?: Sortable[];
    onSortChange?: (sortOptions: SortOption[]) => void;
}
