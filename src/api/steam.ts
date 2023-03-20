import { Request, Response, Router } from 'express';
import { AxiosError } from 'axios';
import client from 'api/client';
import { ApiError } from 'utils/error';
import log from 'utils/log';
import { serverError, success } from 'utils/statusMessages';

const steam = Router();

steam.get('/', async (req: Request, res: Response) => {
  const { query: { path } } = req;

  try {
    const data = await client
    .get(path as string)
    .then(response => response?.data?.response)
    .catch((err: AxiosError) => console.error(`Error: ${client.defaults.baseURL}${err.request.path}`));

    return success(res, data);
  } catch (e) {
    log.error('Failed to get solar data', e as ApiError);
    return serverError(res, 'Failed to get solar data', e as ApiError);
  }
});

export default steam;
