import { useContext } from "react"
import { genId } from "../../../utils/genId"
import { andOperator } from "../constants"
import { FilterContext } from "../FilterContext"
import type { FilterData } from "../type"

type FilterEmptyProps = {
    parentId: string
}

export const FilterEmpty = ({ parentId }: FilterEmptyProps) => {

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
    return <div>
        <div onClick={handleAddFilterClick}>Add Filter</div>
        <div onClick={handleAddGroupFilterClick}>Add Group Filter</div>
    </div>
}