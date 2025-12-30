import { useContext } from "react"
import { genId } from "../../../utils/genId"
import { andOperator, operators } from "../constants"
import { FilterContext } from "../FilterContext"
import { FilterItem } from "../FilterItem"
import type { Filterable, FilterData } from "../type"
import { FilterOperator } from "../FilterOperator"
import styles from './FilterGroup.module.css'


type FilterGroupProps = {
    grantParentId: string,
    parentId: string,
    filterable: Filterable[],
    items: string[],
    isSecondFilter?: boolean,
    isFirstFilter?: boolean,
    isRoot?: boolean,
}

export const FilterGroup = ({ grantParentId, parentId, filterable, items, isFirstFilter, isSecondFilter, isRoot }: FilterGroupProps) => {
    const { data, onFilterChange } = useContext(FilterContext)


    const handleAddFilterClick = () => {
        const newData = { ...data }
        const parentItem = newData[parentId]

        const childItem: FilterData = {
            id: genId(),
            children: [],
            filter: {
                type: 'rich_text',
                property: 'Name',
                condition: 'contains',
                value: ''
            }
        }

        newData[childItem.id] = childItem
        parentItem.children.push(childItem.id)

        if (parentItem.children.length > 1 && !parentItem.operator) {
            parentItem.operator = andOperator
        }

        onFilterChange && onFilterChange(newData)
    }

    const handleAddGroupFilterClick = () => {
        const newData = { ...data }
        const grantParent = newData[parentId]


        if (grantParent.children.length + 1 > 1 && !grantParent.operator) {
            grantParent.operator = andOperator
        }

        const childItem: FilterData = {
            id: genId(),
            children: [],
            filter: {
                type: 'rich_text',
                property: 'Name',
                condition: 'contains',
                value: ''
            }
        }

        const parentItem: FilterData = {
            id: genId(),
            children: [childItem.id],
        }

        newData[childItem.id] = childItem
        newData[parentItem.id] = parentItem
        grantParent.children.push(parentItem.id)


        onFilterChange && onFilterChange(newData)
    }

    const handleOperatorChange = (value: string) => {
        const newData = { ...data }
        const parentItem = newData[grantParentId]
        parentItem.operator = operators.find((operator) => operator.value == value)
        onFilterChange && onFilterChange(newData)
    }

    return <div className={styles.container}>
        {!isRoot ? <FilterOperator
            parent={data[grantParentId]}
            onChange={handleOperatorChange}
            isFirstFilter={isFirstFilter}
            isSecondFilter={isSecondFilter} /> : null
        }

        <div className={styles.filterGroup}>
            <div>
                {items.map((item: string, index: number) => {
                    const filterItem = data[item]
                    return <FilterItem key={filterItem.id}
                        item={filterItem}
                        parentId={parentId}
                        filterable={filterable}
                        isFirstFilter={index == 0}
                        isSecondFilter={index == 1} />
                })}
            </div>
            <div onClick={handleAddFilterClick}>Add Filter</div>
            <div onClick={handleAddGroupFilterClick}>Add Group Filter</div>
        </div>
    </div>

}
