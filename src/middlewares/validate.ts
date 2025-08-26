import { NextFunction, Request, Response } from "express";

export const validate =
  (schema: any) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
