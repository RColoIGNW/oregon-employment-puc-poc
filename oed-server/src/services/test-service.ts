import type { RequestHandler } from "express-serve-static-core";

export const testService: RequestHandler = (req, res) => {
  return res.send(req.body);
};

export default testService;
