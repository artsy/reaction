import { NextFunction, Request, Response } from "express"
import renderPage from "./template"

export function Index(req: Request, res: Response, next: NextFunction) {
  return res.send(renderPage({
    entrypoint: "/loyalty/bundles/gene_filter.js",
    baseURL: "/loyalty",
    sharify: res.locals.sharify,
  }))
}
