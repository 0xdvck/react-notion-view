import type { FilterStore, Operator } from "./type";

export const defaultFilterStore: FilterStore = {
    data: {
        '0': {
            id: '0',
            children: []
        }
    },
    root: '0'
}

export const filterType = {
    richText: 'rich_text',
    checkbox: 'checkbox',
    number: 'number'
}


export const operators = [
    { label: 'And', value: 'and' },
    { label: 'Or', value: 'or' }
]


export const richTextConditions = {
    contains: 'contains',
    doesNotContain: 'does_not_contain',
    equals: 'equals',
    doesNotEqual: 'does_not_equal',
    startsWith: 'starts_with',
    endsWith: 'ends_with',
    isEmpty: 'is_empty',
    isNotEmpty: 'is_not_empty'
}

export const richTextConditionOptions = [
    { label: 'Contains', value: 'contains' },
    { label: 'Does Not Contain', value: 'does_not_contain' },
    { label: 'Equals', value: 'equals' },
    { label: 'Does Not Equal', value: 'does_not_equal' },
    { label: 'Starts With', value: 'starts_with' },
    { label: 'Ends With', value: 'ends_with' },
    { label: 'Is Empty', value: 'is_empty' },
    { label: 'Is Not Empty', value: 'is_not_empty' }
];

export const checkboxConditionOptions = [
    { label: 'Equals', value: 'equals' },
    { label: 'Does Not Equal', value: 'does_not_equal' }
]

export const checkboxValueOptions = [
    { label: 'Checked', value: 'true' },
    { label: 'Unchecked', value: 'false' }
]

export const numberConditions = {
    doesNotEqual: 'does_not_equal',
    equals: 'equals',
    greaterThan: 'greater_than',
    greaterThanOrEqualTo: 'greater_than_or_equal_to',
    lessThan: 'less_than',
    lessThanOrEqualTo: 'less_than_or_equal_to',
    isEmpty: 'is_empty',
    isNotEmpty: 'is_not_empty'
}

export const numberConditionOptions = [
    { label: 'Does Not Equal', value: 'does_not_equal' },
    { label: 'Equals', value: 'equals' },
    { label: 'Greater Than', value: 'greater_than' },
    { label: 'Greater Than Or Equal To', value: 'greater_than_or_equal_to' },
    { label: 'Less Than', value: 'less_than' },
    { label: 'Less Than Or Equal To', value: 'less_than_or_equal_to' },
    { label: 'Is Empty', value: 'is_empty' },
    { label: 'Is Not Empty', value: 'is_not_empty' }
]


export const typeConditions = {
    [filterType.richText]: richTextConditionOptions,
    [filterType.checkbox]: checkboxConditionOptions,
    [filterType.number]: numberConditionOptions
}

export const whereOperator: Operator = {
    label: 'Where',
    value: 'where'
}

export const andOperator: Operator = {
    label: 'And',
    value: 'and'
}