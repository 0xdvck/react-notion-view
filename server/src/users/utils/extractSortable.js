const {  notionSupportType } = require('../../constants')

function extractSortable(notionProperties) {
    const fields = [];
    Object.entries(notionProperties).forEach(([label, property]) => {
        const prop = Array.isArray(property) ? property[0] : property;
        if (notionSupportType.includes(prop.type)) {
            fields.push({
                label,
                value: label
            });
        }
    });

    return fields;
}


module.exports = {
    extractSortable
}