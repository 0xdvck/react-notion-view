const { Client } = require('@notionhq/client');

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID =  process.env.NOTION_DATABASE_ID ;

const notion = new Client({ auth: NOTION_TOKEN });

function notionQuery({sorts, filter}) {
 return notion.dataSources.query({
    data_source_id: NOTION_DATABASE_ID,
    sorts: sorts,
    filter: filter,
  });
}

module.exports = {
    notionQuery
}