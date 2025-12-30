import { SortMenuItem } from "./SortItem";
import type { Sortable, SortMenuProps, SortOption } from "./types";

const sortableData = [{ label: "Name", value: "Name" },
{ label: "Company", value: "Company" },
{ label: "Status", value: "Status" },
{ label: "Priority", value: "Priority" }];


const getRemainSortOption = (sortable: Sortable[], sortOptions: SortOption[]): SortOption | undefined => {
    const selectedValues = sortOptions.map(option => option.property);
    const remainOptions = sortable.filter(option => !selectedValues.includes(option.label));
    if (remainOptions.length > 0) {
        return { property: remainOptions[0].value, direction: 'ascending' } as SortOption;
    }
};



export const Sort = ({ sortable = sortableData, value = [], onSortChange }: SortMenuProps) => {
    const remainOptions = getRemainSortOption(sortable, value);

    const handleAddSort = () => {
        if (!remainOptions) return;
        const newSortOptions = [...value, remainOptions];
        onSortChange && onSortChange(newSortOptions);
    }

    const hanldeRemoveSort = (option: SortOption) => {
        const newSortOptions = value.filter(so => so.property !== option.property);
        onSortChange && onSortChange(newSortOptions);
    }

    const handleSortChange = (option: SortOption) => {
        const newSortOptions = value.map(so => {
            if (so.property === option.property) {
                return option;
            }
            return so;
        });
        onSortChange && onSortChange(newSortOptions);
    }
    return (
        <div>
            {value.map((option) => (
                <SortMenuItem
                    key={option.property}
                    sortable={sortable}
                    value={option.property}
                    directionValue={option.direction}
                    onRemove={() => hanldeRemoveSort(option)}
                    onChange={handleSortChange} />
            ))}

            {remainOptions && <div onClick={handleAddSort}> Add Sort  </div>}
        </div>

    )
}