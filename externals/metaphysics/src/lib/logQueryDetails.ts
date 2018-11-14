import { RequestHandler } from "express"
import { error } from "./loggers"

export function logQueryDetails(threshold: number) {
  const logQueryDetailsMiddleware: RequestHandler = (req, res, next) => {
    const start = process.hrtime()
    res.on("finish", () => {
      const duration = process.hrtime(start)
      if (duration[0] >= threshold) {
        error(`[Query passed threshold]: ${JSON.stringify(req.body, null, 0)}`)
      }
    })
    next()
  }
  return logQueryDetailsMiddleware
}
