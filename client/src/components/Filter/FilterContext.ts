import { createContext } from "react";
import type { FilterData, FilterStore } from "./type";


type FilterContext = {
    data: FilterStore['data']
    onFilterChange?: (data: FilterStore['data']) => void
}

export const FilterContext = createContext<FilterContext>({
    data: {},
    onFilterChange: undefined
});