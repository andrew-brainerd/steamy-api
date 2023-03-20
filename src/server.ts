/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import express from 'express';
import cors from 'cors';
import appInfo from 'utils/appInfo';
import log from 'utils/log';
import { validationErrorHandler } from 'utils/validator';
import api from 'api/index';

const port = process.env.PORT ?? 5000;
const app = express();

const corsConfig = {
  origin: process.env.REACT_APP_ORIGINS?.split(',').map(origin => origin.trim())
};

app.use(cors(corsConfig));
app.use(express.json({ limit: '15mb' }));
app.use(validationErrorHandler);

app.use('/api', api);

app.listen(port, () => {
  log.cool(`Pointless API v${appInfo.version}`);
  log.success(`Listening on port ${port}`);
});
