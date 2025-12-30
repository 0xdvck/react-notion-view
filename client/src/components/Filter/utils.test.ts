import type { FilterStore } from './type';
import { toNotionFilter, flattenNoTionFilter } from './utils'

describe('toNotionFilter', () => {
  const mockStore = {
    '0': {
      id: '0',
      children: ['1', '2'],
      operator: { value: 'and', label: 'And' }
    },
    '1': {
      id: '1',
      children: [],
      filter: {
        property: 'Name',
        type: 'rich_text',
        condition: 'contains',
        value: 'John'
      }
    },
    '2': {
      id: '2',
      children: [],
      filter: {
        property: 'Done',
        type: 'checkbox',
        condition: 'equals',
        value: 'true'
      }
    }
  } as FilterStore['data'];

  it('converts simple flat store to notion filter', () => {
    const result = toNotionFilter(mockStore, '0');

    expect(result).toEqual({
      and: [
        {
          property: 'Name',
          rich_text: {
            contains: 'John'
          }
        },
        {
          property: 'Done',
          checkbox: {
            equals: true
          }
        }
      ]
    });
  });

  it('returns null for non-existent root', () => {
    const result = toNotionFilter(mockStore, '999');
    expect(result).toBeNull();
  });

  it('handles single child node', () => {
    const store = {
      '0': {
        id: '0',
        children: ['1'],
        operator: { value: 'and', label: 'And' }
      },
      '1': {
        id: '1',
        children: [],
        filter: {
          property: 'Name',
          type: 'rich_text',
          condition: 'contains',
          value: 'Test'
        }
      }
    } as FilterStore['data']

    const result = toNotionFilter(store, '0');

    expect(result).toEqual({
      property: 'Name',
      rich_text: {
        contains: 'Test'
      }
    });
  });

  it('handles empty children array', () => {
    const store = {
      '0': {
        id: '0',
        children: [],
      }
    } as FilterStore['data'];

    const result = toNotionFilter(store, '0');
    expect(result).toBeNull();
  });

  it('handles node without filter and children', () => {
    const store = {
      '0': {
        id: '0',
        children: ['1'],
        operator: { value: 'and', label: 'And' }
      },
      '1': {
        id: '1',
        children: []
        // No filter
      }
    } as FilterStore['data'];

    const result = toNotionFilter(store, '0');
    expect(result).toBeNull();
  });

  it('handles filter without condition', () => {
    const store = {
      '0': {
        id: '0',
        children: ['1'],
        operator: { value: 'and', label: 'And' }
      },
      '1': {
        id: '1',
        children: [],
        filter: {
          property: 'Name',
          type: 'rich_text',
          value: 'Test'
          // No condition
        }
      }
    } as unknown as FilterStore['data'];

    const result = toNotionFilter(store, '0');
    expect(result).toEqual({});
  });

  it('handles nested structure', () => {
    const store = {
      '0': {
        id: '0',
        children: ['1'],
        operator: { value: 'or', label: 'Or' }
      },
      '1': {
        id: '1',
        children: ['2', '3'],
        operator: { value: 'and', label: 'And' }
      },
      '2': {
        id: '2',
        children: [],
        filter: {
          property: 'Name',
          type: 'rich_text',
          condition: 'contains',
          value: 'John'
        }
      },
      '3': {
        id: '3',
        children: [],
        filter: {
          property: 'Age',
          type: 'number',
          condition: 'greater_than',
          value: '25'
        }
      }
    } as FilterStore['data']

    const result = toNotionFilter(store, '0');

    expect(result).toEqual({
      and: [
        {
          property: 'Name',
          rich_text: { contains: 'John' }
        },
        {
          property: 'Age',
          number: { greater_than: 25 }
        }
      ]
    });
  });
});

describe('flattenNoTionFilter', () => {

  describe('complex nested structures', () => {
    it('flattens deeply nested AND-OR structure', () => {
      const input = {
        and: [
          {
            property: 'Name',
            rich_text: { contains: 'John' }
          },
          {
            or: [
              {
                and: [
                  {
                    or: [
                      { property: 'Age', number: { greater_than: 25 } },
                      { property: 'Experience', number: { greater_than: 5 } }
                    ]
                  },
                  {
                    property: 'Status',
                    select: { equals: 'Active' }
                  }
                ]
              },
              {
                property: 'Emergency',
                checkbox: { equals: true }
              }
            ]
          }
        ]
      };

      const result = flattenNoTionFilter(input);

      // Expected DNF: (Name AND Emergency) OR (Name AND Status AND Age) OR (Name AND Status AND Experience)
      expect(result).toEqual({
        or: [
          {
            and: [
              {
                property: 'Name',
                rich_text: { contains: 'John' }
              },
              {
                property: 'Age',
                number: { greater_than: 25 }
              },
              {
                property: 'Status',
                select: { equals: 'Active' }
              }
            ]
          },
          {
            and: [
              {
                property: 'Name',
                rich_text: { contains: 'John' }
              },
              {
                property: 'Experience',
                number: { greater_than: 5 }
              },
              {
                property: 'Status',
                select: { equals: 'Active' }
              }
            ]
          },
          {
            and: [
              {
                property: 'Name',
                rich_text: { contains: 'John' }
              },
              {
                property: 'Emergency',
                checkbox: { equals: true }
              }
            ]
          }
        ]
      });
    });

    it('handles OR of ANDs structure', () => {
      const input = {
        or: [
          {
            and: [
              { property: 'A', rich_text: { contains: '1' } },
              { property: 'B', rich_text: { contains: '2' } }
            ]
          },
          {
            and: [
              { property: 'C', rich_text: { contains: '3' } },
              { property: 'D', rich_text: { contains: '4' } }
            ]
          }
        ]
      };

      const result = flattenNoTionFilter(input);

      expect(result).toEqual({
        or: [
          {
            and: [
              { property: 'A', rich_text: { contains: '1' } },
              { property: 'B', rich_text: { contains: '2' } }
            ]
          },
          {
            and: [
              { property: 'C', rich_text: { contains: '3' } },
              { property: 'D', rich_text: { contains: '4' } }
            ]
          }
        ]
      });
    });
  });


  describe('integration: toNotionFilter + flattenNoTionFilter', () => {
    it('converts flat store to flattened notion filter', () => {
      const store = {
        '0': {
          id: '0',
          children: ['1'],
        },
        '1': {
          id: '1',
          children: ['2', '3'],
          operator: { value: 'or', label: 'Or' }
        },
        '2': {
          id: '2',
          children: [],
          filter: {
            property: 'A',
            type: 'rich_text',
            condition: 'contains',
            value: '1'
          }
        },
        '3': {
          id: '3',
          children: ['4'],
        },
        '4': {
          id: '4',
          children: ['5', '6'],
          operator: { value: 'or', label: 'Or' }
        },
        '5': {
          id: '5',
          children: [],
          filter: {
            property: 'B',
            type: 'rich_text',
            condition: 'contains',
            value: '2'
          }
        },
        '6': {
          id: '6',
          children: [],
          filter: {
            property: 'C',
            type: 'rich_text',
            condition: 'contains',
            value: '3'
          }
        }
      } as FilterStore['data']

      const notionFilter = toNotionFilter(store, '0');
      const flattened = flattenNoTionFilter(notionFilter);

      expect(flattened).toEqual({
        or: [
          {
            property: 'A',
            rich_text: {
              contains: '1'
            }
          },
          {
            property: 'B',
            rich_text: {
              contains: '2'
            }
          },
          {
            property: 'C',
            rich_text: {
              contains: '3'
            }
          }
        ]
      });
    });
  });
});

