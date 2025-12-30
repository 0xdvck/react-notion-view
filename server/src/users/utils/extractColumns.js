const {notionSupportType} = require('../../constants')

function extractColumns(notionProperties) {
    if (!notionProperties) return []

    const columns = [];
    
    Object.entries(notionProperties).forEach(([header, property]) => {
      const prop = Array.isArray(property) ? property[0] : property;
      
      if (notionSupportType.includes(prop.type)) {
        const id = header.toLowerCase().replace(/\s+/g, '_');
        
        columns.push({
          id,
          accessorKey: id,
          header
        });
      }
    });
    
    return columns;
}




module.exports = {
    extractColumns
}