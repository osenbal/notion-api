const NOTION_API_DATABASES = `${process.env.NOTION_API_URL}/databases/${process.env.NOTION_DATABASE_ID}`;
const NOTION_API_PAGES = `${process.env.NOTION_API_URL}/pages`;
const NOTION_API_BLOCKS = `${process.env.NOTION_API_URL}/blocks`;

export { NOTION_API_DATABASES, NOTION_API_PAGES, NOTION_API_BLOCKS };
