import { NextFunction, Request, Response } from "express"
import * as Relay from "react-relay"

export default function RelayMiddleware(req: Request, res: Response, next: NextFunction) {
  let options = {
    headers: !!req.user ? {
      "X-USER-ID": req.user.id,
      "X-ACCESS-TOKEN": req.user.get("accessToken"),
    } : {},
  }

  res.locals.networkLayer = new Relay.DefaultNetworkLayer(
    process.env.METAPHYSICS_ENDPOINT,
    options,
  )

  next()
}
