const { typeMappingForFilterAndSort, notionSupportType } = require('../../constants')

function extractFilterable(notionProperties) {
    const fields = [];
    Object.entries(notionProperties).forEach(([label, property]) => {
        const prop = Array.isArray(property) ? property[0] : property;
        if (notionSupportType.includes(prop.type)) {
            fields.push({
                label,
                value: typeMappingForFilterAndSort[prop.type] || prop.type
            });
        }
    });

    return fields;
}


module.exports = {
    extractFilterable
}