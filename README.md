## Notion Database Table View

## Description

An implementation of Momos's challenge.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Task List](#task-list)
- [FAQ](#faq)

## Prerequisites

- [Docker] https://github.com/docker lastest

## Setup

### Docker

1. Clone or download this repository to your local machine, then extract and open the folder.
2. Run `docker-compose up` to deploy application. If `docker-compose up` doesn’t work, please spin up the client and server in their respective folders.
4. Access the UI with default domain `localhost:8000`

### Notion token
1. You can use your own notion token (`NOTION_TOKEN`, `NOTION_DATABASE_ID`)
   - You need to replace  `NOTION_TOKEN`, `NOTION_DATABASE_ID` in `docker-compose.yaml`
   - Or replace `NOTION_TOKEN`, `NOTION_DATABASE_ID` in `server/src/notion/notion.service.js`
2. Or you can also use this CRM [database](https://www.notion.so/Sales-CRM-2d4eda51cc70809399f6f429555e7baf?source=copy_link). The necessary token has already been sent to HR email
    
## Task List

- [x] Implement a basic given a Notion database as input
  - [x] Support sorting
  - [x] Support rearrangement and resizing of columns - expected behavior:
        - [x] Click and hold the column headings to drag them left or right
        - [x] Resize columns by hovering over their edges, and dragging right or left
- [x] Build a Notion filter UI for supporting database filters
  - [x] Support the property types `checkbox`,`rich_text`,`number`
    - [ ] Support other types `date`, `multi_select`, `select` , `timestamp` , `status`
  - [x] Support Compound filters with filter groups (more than 3,4 levels)
  - [x] Implement unit tests for the Compound filters
- [ ] Stretch Goals
  - [ ] Implement the NOT operator for compound filter conditions.
