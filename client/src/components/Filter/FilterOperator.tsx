import { Select } from "../Select/Select"
import { operators, whereOperator } from "./constants"
import type { FilterData } from "./type"


type FilterOperatorProps = {
    isSecondFilter?: boolean,
    isFirstFilter?: boolean,
    parent: FilterData,
    onChange?: (value: string) => void
}

export const FilterOperator = ({ isSecondFilter, isFirstFilter, parent, onChange }: FilterOperatorProps) => {
    const parentOperator = parent.operator
    const handleOnChange = (value: string) => {
        onChange && onChange(value)
    }

    if (isFirstFilter) {
        return whereOperator.label
    }

    if (isSecondFilter && parentOperator) {
        return <Select options={operators} value={parentOperator.value} onChange={handleOnChange} />
    }

    if (parentOperator) {
        return parentOperator.label
    }
}
