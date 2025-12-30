

const { extractColumns } = require('./utils/extractColumns');
const { extractFilterable } = require('./utils/extractFilterable')
const { extractData } = require('./utils/extractData')
const { extractSortable } = require('./utils/extractSortable');
const { notionQuery } = require('../notion/notion.service');


async function getAllUsers({ sorts, filters }) {

  const response = await notionQuery({sorts, filter: filters})
 
  const data = (response.results || []).map((item) => {
    return extractData(item.properties);
  });


  /**
   * We should split these to metadata api for more clean code
   */
  const properties = response.results.find(item => item.properties)?.properties
  const columns = extractColumns(properties)
  const filterable = extractFilterable(properties)
  const sortable = extractSortable(properties)

  return {
    sortable,
    filterable,
    columns: columns,
    data
  };
}

module.exports = {
  getAllUsers,
};
