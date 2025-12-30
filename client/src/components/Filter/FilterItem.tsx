import type { Filterable, FilterData } from "./type"
import { FilterGroup } from "./FilterGroup/FilterGroup"
import { FilterSingle } from "./FilterSingle/FilterSingle"
import { FilterEmpty } from "./FilterEmpty/FilterEmpty"

type FilterItemProps = {
    item: FilterData,
    parentId: string,
    operator?: string | React.ReactNode
    filterable: Filterable[]
    isFirstFilter?: boolean,
    isSecondFilter?: boolean,
    isRoot?: boolean,
}


export const FilterItem = ({
    parentId,
    item,
    filterable,
    isFirstFilter,
    isSecondFilter,
    isRoot }: FilterItemProps) => {
    const { children, id, filter } = item

    if (children && children.length > 0) {
        return <FilterGroup
            grantParentId={parentId}
            parentId={id}
            filterable={filterable}
            items={children}
            isFirstFilter={isFirstFilter}
            isSecondFilter={isSecondFilter} isRoot={isRoot} />
    }

    if (filter) {
        return <FilterSingle
            parentId={parentId}
            filterable={filterable}
            isFirstFilter={isFirstFilter}
            isSecondFilter={isSecondFilter} 
            id = {id}
            />
    }


    return <FilterEmpty parentId={parentId} />

}