import { NextFunction, Request, Response } from "express"

export function Home(req: Request, res: Response, next: NextFunction) {
  return res.redirect(req.baseUrl + "/inquiries")
}
