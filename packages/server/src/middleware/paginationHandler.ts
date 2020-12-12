import { Request, Response, NextFunction } from 'express';

const paginationHandler = (
  req: Request,
  _: Response,
  next: NextFunction,
): void => {
  req.pagination = {
    // @ts-ignore
    limit: parseInt(req.query.limit, 10) || 25,
    // @ts-ignore
    sort: req.query.sort,
    // @ts-ignore
    page: parseInt(req.query.page, 10) || 1,
  };
  next();
};
export default paginationHandler;
