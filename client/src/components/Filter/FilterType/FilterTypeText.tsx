import { useEffect, useState } from "react"
import { Select } from "../../Select/Select"
import { TextField } from "../../TextField/TextField"
import { checkboxConditionOptions, richTextConditionOptions, richTextConditions } from "../constants"
import type { Condition } from "../type"

type FilterTypeTextProps = {
    onConditionChange: (condition: Condition) => void,
    onValueChange: (value: string) => void,
    value: string,
    conditionValue: string
}

export const FilterTypeText = ({ onConditionChange, onValueChange, value, conditionValue }: FilterTypeTextProps) => {

    const [selectedConditonValue, setSelectedConditionValue] = useState(conditionValue || richTextConditionOptions[0].value)

    const [text, setText] = useState(value)

    const handleConditionChange = (value: string) => {
        const condition = richTextConditionOptions.find((condition) => condition.value == value)
        if (!condition || condition.value == selectedConditonValue) {
            return
        }
        setSelectedConditionValue(condition.value)
        onConditionChange(condition)
    }

    const handleOnTextChange = (value: string) => {
        const condition = richTextConditionOptions.find((condition) => condition.value == selectedConditonValue)
        if(!condition) return 

        setText(value)
        onValueChange(value)
    }

    useEffect(() => {
            const condition = checkboxConditionOptions.find((condition) => condition.value == selectedConditonValue)
            condition && onConditionChange(condition)
            onValueChange(text)
    },[])



    return <>
        <Select options={richTextConditionOptions} value={selectedConditonValue} onChange={handleConditionChange} />
        {
            ![richTextConditions.isEmpty, richTextConditions.isNotEmpty].includes(selectedConditonValue) ?
            <TextField value={text} onChange={handleOnTextChange} /> : null
        }
    </>
}