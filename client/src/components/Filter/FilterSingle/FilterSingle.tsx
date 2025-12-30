import { useContext, useState } from "react";
import { Select } from "../../Select/Select";
import { operators } from "../constants";
import { FilterContext } from "../FilterContext";
import { FilterOperator } from "../FilterOperator";
import type { Condition, Filterable } from "../type";
import styles from './FilterSingle.module.css'
import { FilterTypeRenderer } from "../FilterType/FilterTypeRenderer";

type FilterSingleProps = {
    id: string,
    parentId: string,
    filterable: Filterable[],
    isSecondFilter?: boolean,
    isFirstFilter?: boolean,
}

export const FilterSingle = ({ id, parentId, filterable, isSecondFilter, isFirstFilter }: FilterSingleProps) => {
    const { data, onFilterChange } = useContext(FilterContext)
    const item = data[id]

    const [selectedFilter, setSelectedFilter] = useState(filterable.find(filter => filter.label == item.filter?.property) || filterable[0])

    const parent = data[parentId];


    const handleOperatorChange = (value: string) => {
        const newOperator = operators.find((operator) => operator.value == value)
        const newData = { ...data }

        newData[parentId].operator = newOperator
        onFilterChange && onFilterChange(newData)
    }

    const handleFilterTypeChange = (value: string) => {
        const newFilter = filterable.find((filter) => filter.value == value)
        if (!newFilter || newFilter.value == selectedFilter.value) {
            return
        }
        setSelectedFilter(newFilter)

        const newData = { ...data }
        newData[id].filter = {
            type: newFilter.value,
            property: newFilter.label,
            condition: '',
            value: ''
        }
        onFilterChange && onFilterChange(newData)
    }

    const handleOnValueChange = (value: string) => {
        if (!item.filter) {
            return
        }
        const newData = { ...data }
        newData[id].filter = {
            type: item.filter.type,
            property: item.filter.property,
            condition: item.filter.condition,
            value: value
        }
        onFilterChange && onFilterChange(newData)

    }

    const handleOnConditionChange = (condition: Condition) => {
        if (!item.filter) {
            return
        }
        const newData = { ...data }
        newData[id].filter = {
            type: item.filter.type,
            property: item.filter.property,
            condition: condition.value,
            value: item.filter.value,
        }
        onFilterChange && onFilterChange(newData)

    }


    if (!item.filter) return null

    return <div className={styles.filterSingle}>
        <FilterOperator isSecondFilter={isSecondFilter} isFirstFilter={isFirstFilter} parent={parent} onChange={handleOperatorChange} />
        <Select options={filterable} value={selectedFilter.value} onChange={handleFilterTypeChange} />
        <FilterTypeRenderer type={item.filter.type}
            conditionValue={item.filter.condition}
            value={item.filter.value}
            onValueChange={handleOnValueChange}
            onConditionChange={handleOnConditionChange} />
    </div>
}