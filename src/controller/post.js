import { getPage, getBlockChildren, getPageFiltered } from '../services/notion';
import { successResponse, errorResponse } from '../utils/utils';

export const getAllPosts = async (req, res) => {
  try {
    const promises = await getPage();
    const posts = await Promise.all(promises);
    res.status(200).send(successResponse(posts));
  } catch (error) {
    res.status(500).send(errorResponse(500, error.message));
  }
};

export const getDetailPost = async (req, res) => {
  try {
    const post = await getBlockChildren(req.params.id);
    console.log(post);
    res.status(200).send(successResponse(post));
  } catch (error) {
    console.log(error);
    res.status(500).send(errorResponse(500, error.message));
  }
};

export const getPublished = async (req, res) => {
  try {
    const filter = {
      property: 'archived',
      checkbox: {
        equals: false,
      },
    };

    const posts = await getPageFiltered(filter);

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalItem = posts?.length;

    const results = {};
    if (endIndex < posts?.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    results.totalItems = totalItem;

    if (!page || !limit) {
      results.results = posts;
      return res.status(200).send(successResponse(results));
    }

    results.results = posts.slice(startIndex, endIndex);
    res.status(200).send(successResponse(results));
  } catch (error) {
    res.status(500).send(errorResponse(500, error.message));
  }
};

export const getFilteredCategory = async (req, res) => {
  try {
    const filter = {
      property: 'category',
      multi_select: {
        contains: req.params.name,
      },
    };
    const posts = await getPageFiltered(filter);
    res.status(200).send(successResponse(posts));
  } catch (error) {
    res.status(500).send(errorResponse(500, error.message));
  }
};
