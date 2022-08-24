import { Router } from 'express';
import {
  getAllPosts,
  getDetailPost,
  getPublished,
  getFilteredCategory,
} from '../../controller/post';

const router = Router();

router.get('/all-posts', getAllPosts);
router.get('/published', getPublished);
router.get('/detail/:id', getDetailPost);
router.get('/category/:name', getFilteredCategory);

export default router;
