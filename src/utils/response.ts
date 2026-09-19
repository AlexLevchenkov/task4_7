import { Response } from 'express';
import { TApiResponder } from 'types';

export const apiResponse: TApiResponder = (res: Response, data: any, status = 200, message?: string) => {
  res.status(status).json({ data, message });
};
