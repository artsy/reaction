import { NextFunction, Request, Response } from "express"
import { fetchCollectorProfile } from "../gravity"

export default function UserMiddleware(req: Request, res: Response, next: NextFunction) {
  const { CURRENT_USER } = res.locals.sd
  if (CURRENT_USER) {
    fetchCollectorProfile(CURRENT_USER.accessToken)
      .then(profile => {
        CURRENT_USER.profile = profile
      })
      .then(next)
      .catch(err => {
        // TODO Do these really need to be empty strings?
        CURRENT_USER.profile = {
          confirmed_buyer_at: "",
          loyalty_applicant_at: "",
          name: "",
        }
        next()
      })
  } else {
    next()
  }
}
