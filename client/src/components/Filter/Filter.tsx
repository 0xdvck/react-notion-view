import { FilterContext } from "./FilterContext"
import { FilterItem } from "./FilterItem"
import type { Filterable, FilterStore } from "./type"

type FilterProps = {
    store: FilterStore
    onFilterChange: (filterStore: FilterStore) => void
    filterable: Filterable[]
}


export const Filter = ({ store, onFilterChange, filterable = []}: FilterProps) => {
    const { data, root } = store
    const item = data[root]

    //We can make this stable
    const handleOnFilterChange = (data: FilterStore['data']) => {
        const newStore = { ...store, data }
        onFilterChange(newStore)
    }

    return <FilterContext.Provider value={{ data, onFilterChange: handleOnFilterChange }}>
        <FilterItem isRoot key={root} item={item} parentId={root} filterable={filterable}/>
    </FilterContext.Provider>
}
