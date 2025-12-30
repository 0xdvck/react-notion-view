import { filterType, numberConditions, richTextConditions } from "./constants";
import type { FilterStore } from "./type";

const toNotionValue = ({ type, condition, value }: { type: string, condition: string, value: string | number | boolean }) => {
    if (type == filterType.checkbox) return value === 'true'

    if (type == filterType.richText) {
        if (condition == richTextConditions.isEmpty || condition == richTextConditions.isNotEmpty) {
            return true
        }

        return value
    }

    if (type == filterType.number) {
        if (condition == numberConditions.isEmpty || condition == numberConditions.isNotEmpty) {
            return true
        }
        return Number(value)
    }
}

export const toNotionFilter = (store: FilterStore['data'], root: string) => {
    const buildFilter = (nodeId: string): any => {
        const node = store[nodeId];
        if (!node) return null;

        if (node.filter) {
            const { property, type, condition, value } = node.filter;
            if (!condition) return {}

            return {
                property,
                [type]: {
                    [condition]: toNotionValue({ type, value, condition })
                }
            };
        }

        if (node.children && node.children.length > 0) {
            const children = node.children
                .map(buildFilter)
                .filter(Boolean);

            if (children.length === 0) return null;
            if (children.length === 1) return children[0];

            const operator = node.operator?.value || 'and';

            return {
                [operator]: children
            };
        }

        return null;
    };

    return buildFilter(root);
};

/**
 * Since notion filter only support 2 level deep,
 * we need to use dnf to flatten n nested level to 2 level
 * // TODO: make it more type safe
 */
export function flattenNoTionFilter(node: any) {

    const cartesianProduct = (arrays: any[]) => {
        return arrays.reduce((acc: any[], array: any[]) => {
            const result: any[] = [];
            acc.forEach((prefix: any) => {
                array.forEach((item: any) => {
                    result.push([...prefix, item]);
                });
            });
            return result;
        }, [[]]);
    };

    const mergeOr = (dnfExpressions: any[]) => {
        const allClauses: any[] = [];

        dnfExpressions.forEach((dnf: any) => {
            if (dnf.or) {
                dnf.or.forEach((clause: any) => {
                    allClauses.push(clause);
                });
            } else {
                allClauses.push(dnf);
            }
        });


        if (allClauses.length === 1 && allClauses[0].property) {
            return allClauses[0];
        }

        return { or: allClauses };
    };

    const distributeAnd = (dnfExpressions: any[]) => {
        const allClausesSets = dnfExpressions.map(dnf => {
            if (dnf.or) {
                return dnf.or;
            }
            return [dnf]
        });

        const product = cartesianProduct(allClausesSets);

        const resultClauses = product.map((combination: any) => {
            const allFilters: any[] = [];

            combination.forEach((clause: any) => {
                if (clause.and) {
                    // AND clause - add all its filters
                    clause.and.forEach((filter: any) => {
                        allFilters.push(filter);
                    });
                } else {
                    // Single filter
                    allFilters.push(clause);
                }
            });

            // If only one filter, return it as single filter
            if (allFilters.length === 1) {
                return allFilters[0];
            }

            // If multiple filters, wrap in AND
            return { and: allFilters };
        });

        if (resultClauses.length === 1) {
            return resultClauses[0];
        }

        return { or: resultClauses };
    };

    if (!node) return

    if (node.property) {
        return node;
    }

    const operator = node.and ? 'and' : 'or';
    const children = node[operator] || [];

    // Recursively convert children to DNF
    const dnfChildren = children.map((child: any) => flattenNoTionFilter(child));

    if (operator === 'or') {
        return mergeOr(dnfChildren);
    } else {
        return distributeAnd(dnfChildren);
    }
}


