const NOTION_API_URL = process.env.NOTION_API_URL;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_SECRET = process.env.NOTION_SECRET;
const NOTION_VERSION = process.env.NOTION_VERSION;

const HEADERS = {
  Accept: 'application/json',
  'Notion-Version': NOTION_VERSION,
  'Content-Type': 'application/json',
  Authorization: NOTION_SECRET,
};

export { HEADERS, NOTION_DATABASE_ID, NOTION_SECRET, NOTION_API_URL };
