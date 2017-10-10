import { NextFunction, Request, Response } from "express"
import * as Relay from "react-relay"

export default function RelayMiddleware(req: Request, res: Response, next: NextFunction) {
  const { CURRENT_USER } = res.locals.sd
  let options = {
    headers: !!CURRENT_USER
      ? {
          "X-USER-ID": CURRENT_USER.id,
          "X-ACCESS-TOKEN": CURRENT_USER.accessToken,
        }
      : {},
  }

  res.locals.networkLayer = new Relay.DefaultNetworkLayer(process.env.METAPHYSICS_ENDPOINT, options)

  next()
}
