import { Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
      };
      validated: any;
    }
  }
}

export type TApiResponder = (res: Response, data: any, status?: number, message?: string) => void;

export type IThisWhisUserId<T extends object> = T & {
  userId: string;
};