import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./api/users";
import { Table } from "./components/Table/Table";
import { TitleBar } from "./components/TitleBar/TitleBar";
import { useRef, useState } from "react";
import type { SortOption } from "./components/Sort/types";
import type { FilterStore } from "./components/Filter/type";
import { flattenNoTionFilter, toNotionFilter } from "./components/Filter/utils";
import { defaultFilterStore } from "./components/Filter/constants";


export const Page = () => {
    const [sorts, setSorts] = useState<SortOption[]>([]);
    const [filterStore, setFilterStore] = useState<FilterStore>(defaultFilterStore);

    const previousFilters = useRef<any>(null)
    let filters = flattenNoTionFilter(toNotionFilter(filterStore?.data, filterStore?.root))
    if (filters?.or?.length == 0) {
        filters = previousFilters.current
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['users', sorts, filters],
        queryFn: () => getUsers({ sorts, filters }),
        placeholderData: (previousData) => previousData,
    });


    const handleSortChange = (sortOptions: SortOption[]) => {
        setSorts(sortOptions);
    }

    const handleFilterChange = (filterStore: FilterStore) => {
        setFilterStore(filterStore)
        previousFilters.current = filters
    }


    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred: {(error as Error).message}</div>;
    }

    const { columns, data: tableData, sortable, filterable } = data
    return (<>
        {/* Maybe we should use context here to avoid passing props down */}
        <TitleBar title="My Database"
            filterable={filterable}
            sortable={sortable}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}></TitleBar>
        <Table data={tableData} columns={columns} />
    </>)
}