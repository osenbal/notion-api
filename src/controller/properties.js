import { getTags, getCategory } from '../services/notion';
import { successResponse, errorResponse } from '../utils/utils';

export const getTagsPost = async (req, res) => {
  try {
    const tags = await getTags();
    return res.status(200).send(successResponse(tags));
  } catch (error) {
    return res.status(500).send(errorResponse(500, error.message));
  }
};

export const getCategoryPost = async (req, res) => {
  try {
    const category = await getCategory();
    return res.status(200).send(successResponse(category));
  } catch (error) {
    if (error.status === 500) {
      return res.status(500).send(errorResponse(500, error.message));
    }
  }
};
