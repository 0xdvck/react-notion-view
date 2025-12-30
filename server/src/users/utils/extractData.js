const {notionSupportType} = require('../../constants')

function extractData(notionProperties) {
  const result = {};
  
  Object.entries(notionProperties).forEach(([label, property]) => {
    const prop = Array.isArray(property) ? property[0] : property;
    const key = label.toLowerCase().replace(/\s+/g, '_');
    if (!notionSupportType.includes(prop.type)) return  
    
    switch (prop.type) {
      case 'checkbox':
        result[key] = prop.checkbox;
        break;
        
      case 'number':
        result[key] = prop.number;
        break;
        
      case 'title':
        result[key] = (prop.title || [])
          .map(item => item.plain_text || item.text?.content || '')
          .join('');
        break;
        
      case 'rich_text':
        result[key] = (prop.rich_text || [])
          .map(item => item.plain_text || item.text?.content || '')
          .join('');
        break;
        
      case 'select':
        result[key] = prop.select?.name || null;
        break;
        
      case 'multi_select':
        result[key] = (prop.multi_select || [])
          .map(item => item.name)
          .join(', ');
        break;
        
      case 'status':
        result[key] = prop.status?.name || null;
        break;
        
      case 'date':
        result[key] = prop.date?.start || null;
        break;
        
      case 'email':
      case 'phone_number':
      case 'url':
        result[key] = prop[prop.type] || null;
        break;
        
      default:
        // Skip or handle other types
        break;
    }
  });
  
  return result;
}


module.exports = {
    extractData
}