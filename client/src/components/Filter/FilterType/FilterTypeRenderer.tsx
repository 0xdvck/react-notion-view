import { filterType } from "../constants"
import { FilterTypeText } from "./FilterTypeText"
import type { Condition } from "../type"
import { FilterTypeCheckbox } from "./FilterTypeCheckbox"
import { FilterTypeNumber } from "./FilterTypeNumber"

type FilterTypeRendererProps = {
    type: string
    onConditionChange: (condition: Condition) => void,
    onValueChange: (value: string) => void,
    value: any,
    conditionValue: string
}

export const FilterTypeRenderer = ({ type, onConditionChange, onValueChange, value, conditionValue }: FilterTypeRendererProps) => {
    switch (type) {
        case filterType.richText:
            return <FilterTypeText onConditionChange={onConditionChange} onValueChange={onValueChange} conditionValue={conditionValue} value={value} />
        case filterType.checkbox:
            return <FilterTypeCheckbox onConditionChange={onConditionChange} onValueChange={onValueChange} conditionValue={conditionValue} value={value} />
        case filterType.number:
            return <FilterTypeNumber onConditionChange={onConditionChange} onValueChange={onValueChange} conditionValue={conditionValue} value={value} />
        default:
            return null
    }
}
