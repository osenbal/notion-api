import express from 'express';
import properties from './properties/index';
import posts from './posts/index';
import { errorResponse } from '../utils/utils';

const router = express();

router.use('/properties', properties);
router.use('/posts', posts);

// Route 404 - Not Found
router.use('/*', (req, res) => {
  res.status(404).send(errorResponse(404, 'Not Found'));
});

export default router;
