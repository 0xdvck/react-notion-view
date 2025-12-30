import { useEffect, useState } from "react"
import { Select } from "../../Select/Select"
import { TextField } from "../../TextField/TextField"
import { checkboxConditionOptions, numberConditionOptions, numberConditions } from "../constants"
import type { Condition } from "../type"

type FilterTypeTextProps = {
    onConditionChange: (condition: Condition) => void,
    onValueChange: (value: string) => void,
    value: string,
    conditionValue: string
}

export const FilterTypeNumber = ({ onConditionChange, onValueChange, value, conditionValue }: FilterTypeTextProps) => {

    const [selectedConditonValue, setSelectedConditionValue] = useState(conditionValue || numberConditionOptions[0].value)

    const [number, setNumber] = useState(value)

    const handleConditionChange = (value: string) => {
        const condition = numberConditionOptions.find((condition) => condition.value == value)
        if (!condition || condition.value == selectedConditonValue) {
            return
        }
        setSelectedConditionValue(condition.value)
        onConditionChange(condition)
    }

    const handleOnTextChange = (value: string) => {
        const condition = numberConditionOptions.find((condition) => condition.value == selectedConditonValue)
        if(!condition) return 

        setNumber(value)
        onValueChange(value)
    }

    useEffect(() => {
            const condition = checkboxConditionOptions.find((condition) => condition.value == selectedConditonValue)
            condition && onConditionChange(condition)
            onValueChange(number)
    },[])



    return <>
        <Select width={120} options={numberConditionOptions} value={selectedConditonValue} onChange={handleConditionChange} />
        {
            ![numberConditions.isEmpty, numberConditions.isNotEmpty].includes(selectedConditonValue) ?
            <TextField value={number} onChange={handleOnTextChange} type="number" /> : null
        }
    </>
}