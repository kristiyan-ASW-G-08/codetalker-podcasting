declare namespace Express {
  interface Request {
    userId: string;
    pagination: {
      limit: number;
      sort: string;
      sort: string;
      page: number;
    };
  }
}
