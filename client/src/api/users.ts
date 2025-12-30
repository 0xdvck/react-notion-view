import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../types";
import { apiClient } from "./client";
import type { Filterable } from "../components/Filter/type";
import type { Sortable, SortOption } from "../components/Sort/types";

export const getUsers = async ({ sorts, filters }: {sorts: SortOption[], filters: any}): 
    Promise<{ columns: ColumnDef<User>[], data: User[], filterable: Filterable[], sortable: Sortable[] }> => {

    const response = await apiClient.post(`/users`, {
        sorts,
        filters
    });

    return response.data;
}