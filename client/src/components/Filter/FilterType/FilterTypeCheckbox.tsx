import { useEffect, useState } from "react"
import { Select } from "../../Select/Select"

import { checkboxConditionOptions, checkboxValueOptions } from "../constants"
import type { Condition } from "../type"

type FilterTypeTextProps = {
    onConditionChange: (condition: Condition) => void,
    onValueChange: (value: string) => void,
    
    value: string,
    conditionValue: string,
}

export const FilterTypeCheckbox = ({ onConditionChange, onValueChange, value, conditionValue }: FilterTypeTextProps) => {
    const [selectedConditonValue, setSelectedConditionValue] = useState(conditionValue || checkboxConditionOptions[0].value)
    const [selectedValue, setSelectedValue] = useState(value || checkboxValueOptions[0].value)

    const handleConditionChange = (value: string) => {
        const condition = checkboxConditionOptions.find((condition) => condition.value == value)
        if (!condition || condition.value == selectedConditonValue) {
            return
        }
        setSelectedConditionValue(condition.value)
        onConditionChange(condition)
    }

    const handleOnTextChange = (value: string) => {
        const newValueOptions = checkboxValueOptions.find((option) => option.value == value)
        if (!newValueOptions || newValueOptions.value == selectedValue) {
            return
        }

        setSelectedValue(newValueOptions.value)
        onValueChange(newValueOptions.value)
    }

    useEffect(() => {
        const condition = checkboxConditionOptions.find((condition) => condition.value == selectedConditonValue)
        condition && onConditionChange(condition)
        onValueChange(selectedValue)
    },[])

    return <>
        <Select options={checkboxConditionOptions} value={selectedConditonValue} onChange={handleConditionChange} />
        <Select options={checkboxValueOptions} value={selectedValue} onChange={handleOnTextChange} />
    </>
}