

export type Operator = {
    label: string,
    value: string,
}

export type Condition = {
    label: string,
    value: string,
}

export type Filter = {
    type: string,
    property: string,
    condition: string,
    value: string | boolean | number
}

export type Filterable = {
    label: string,
    value: string,
}

export type FilterData = {
    id: string,
    operator?: Operator,
    children: string[],
    filter?: Filter ,
}

export type FilterStore = {
    data: { [key: string]: FilterData },
    root: string
}
