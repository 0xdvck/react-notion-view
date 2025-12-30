var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const userController = require('../src/users/user.controller');

const { Client } = require("@notionhq/client")

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

/* GET users listing. */
router.post('/', userController.getUsers);
module.exports = router;



// // Example: Read from database
// app.get('/items', async (req, res) => {
//   try {
//     const response = await notion.dataSources.query({
//       data_source_id: databaseId,
//       // // Add filters/sorts if needed
//       // filter: {
//       //   property: "Status",
//       //   select: {
//       //     equals: "Active"
//       //   }
//       // }
//     });

//     const records = response.results.map((item) => {
//         return item.properties
//     })
    
  
//     res.json(records);
//   } catch (error) {
//     next(createError(500, error.message));
//   }
// });

// // Example: Create new item
// app.post('/items', async (req, res) => {
//   try {
//     const { title, description, status } = req.body;
    
//     const response = await notion.pages.create({
//       parent: {
//         data_source_id: databaseId,
//       },
//       properties: {
//         Name: {
//           title: [
//             {
//               text: {
//                 content: title,
//               },
//             },
//           ],
//         },
//         Description: {
//           rich_text: [
//             {
//               text: {
//                 content: description,
//               },
//             },
//           ],
//         },
//         Status: {
//           select: {
//             name: status,
//           },
//         },
//       },
//     });
    
//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Example: Update item
// app.patch('/items/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
    
//     const response = await notion.pages.update({
//       page_id: id,
//       properties: {
//         Status: {
//           select: {
//             name: status,
//           },
//         },
//       },
//     });
    
//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
