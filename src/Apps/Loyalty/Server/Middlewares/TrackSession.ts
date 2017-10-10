import { NextFunction, Request, Response } from "express"
import * as uuid from "uuid"

export default function TrackSessionID(req: Request, res: Response, next: NextFunction) {
  if (req.sessionID) {
    res.locals.sharify.data.SESSION_ID = req.sessionID
  } else {
    res.locals.sharify.data.SESSION_ID = uuid.v1()
  }
  next()
}
