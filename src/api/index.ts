import express, { Request, Response } from 'express';
import appInfo from 'utils/appInfo';
import steam from 'api/steam';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send({
    message: `Welcome to the Tailboard API v${appInfo.version}!`
  });
});

router.use('/steam', steam);

export default router;
