import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/routes';

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use('/api/v1', router);

app.listen(port, () => {
  console.log('server running on : http://localhost:' + port);
});
