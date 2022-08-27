import 'dotenv/config';
import axios from 'axios';
import { HEADERS, NOTION_DATABASE_ID, NOTION_SECRET } from '../utils/constant';
import { NOTION_API_DATABASES, NOTION_API_BLOCKS } from '../utils/api';

if (!NOTION_DATABASE_ID || !NOTION_SECRET) {
  throw Error('Must define NOTION_SECRET and NOTION_DATABASE_ID in env');
}

function notionPropertiesById(properties) {
  return Object.values(properties).reduce((obj, property) => {
    const { id, ...rest } = property;
    return { ...obj, [id]: rest };
  }, {});
}

function mappingResultListPage(listPage) {
  const page = listPage.map((post) => {
    const propertiesData = notionPropertiesById(post.properties);

    const result = {
      id: post.id,
      title: propertiesData[process.env.NOTION_POSTS_ID]?.title[0]?.plain_text,
      featuredImage:
        propertiesData[process.env.NOTION_FEATURED_IMAGE_ID]?.files[0]?.file ||
        null,
      description:
        propertiesData[process.env.NOTION_DESCRIPTION_ID]?.rich_text[0]
          ?.plain_text || null,
      isArchived: propertiesData[process.env.NOTION_ARCHIVED_ID]?.checkbox,
      categories:
        propertiesData[process.env.NOTION_CATEGORY_ID]?.multi_select || [],
      tags: propertiesData[process.env.NOTION_TAGS_ID]?.multi_select || [],
      createdBy: propertiesData[process.env.NOTION_CREATED_BY_ID]?.people || [],
      createdAt: propertiesData[process.env.NOTION_CREATED_AT_ID]?.created_time,
      deletedAt: propertiesData[process.env.NOTION_DELETE_AT_ID]?.date,
    };

    return result;
  });

  return page;
}

// GET All Categories
async function getCategory() {
  const options = {
    method: 'GET',
    url: `${NOTION_API_DATABASES}`,
    headers: HEADERS,
  };

  const response = await axios.request(options);

  return notionPropertiesById(response?.data.properties)[
    process.env.NOTION_CATEGORY_ID
  ].multi_select.options.map((option) => {
    return { id: option.id, name: option.name };
  });
}

// GET All Tags
async function getTags() {
  const options = {
    method: 'GET',
    url: `${NOTION_API_DATABASES}`,
    headers: HEADERS,
  };

  const response = await axios.request(options);

  return notionPropertiesById(response?.data.properties)[
    process.env.NOTION_TAGS_ID
  ].multi_select.options.map((option) => {
    return { id: option.id, name: option.name };
  });
}

// GET All Posts
async function getPage() {
  const options = {
    method: 'POST',
    url: `${NOTION_API_DATABASES}/query`,
    headers: HEADERS,
  };

  const response = await axios.request(options);

  const result = mappingResultListPage(response?.data?.results);
  return result;
}

function mappingBlockChildren(obj = {}) {
  switch (obj?.type) {
    case 'paragraph':
      return obj.paragraph?.rich_text
        .map((text) => {
          const annotationStyle = text?.annotations;

          return `<p style="${
            annotationStyle?.bold
              ? 'font-weight: bold;'
              : annotationStyle?.italic
              ? 'font-style: italic;'
              : annotationStyle?.underline
              ? 'text-decoration: underline;'
              : annotationStyle?.strikethrough
              ? 'text-decoration: line-through;'
              : annotationStyle?.color === 'default'
              ? 'color: #37352f'
              : '#000000'
          }">${text?.text?.content}</p>`;
        })
        .join('<br />');
    case 'image':
      return `<img src="${obj.image?.external?.url}" alt="external" />`;
    default:
      return obj;
  }
}

// GET Detail Post
async function getBlockChildren(postId) {
  const options = {
    method: 'GET',
    url: `${NOTION_API_BLOCKS}/${postId}/children`,
    params: { page_size: '100' },
    headers: HEADERS,
  };

  const response = await axios.request(options);

  return response.data?.results;
}

// GET Post Filtered
async function getPageFiltered(filters) {
  const options = {
    method: 'POST',
    url: `${NOTION_API_DATABASES}/query`,
    headers: HEADERS,
    data: {
      filter: filters,
    },
  };

  const response = await axios.request(options);

  const result = mappingResultListPage(response?.data?.results);
  return result;
}

export { getTags, getCategory, getPage, getBlockChildren, getPageFiltered };
