import { Router } from 'express';
import { getTagsPost, getCategoryPost } from '../../controller/properties';

const router = Router();

router.get('/tags', getTagsPost);
router.get('/categories', getCategoryPost);

export default router;
