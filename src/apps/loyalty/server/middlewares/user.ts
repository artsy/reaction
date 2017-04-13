import { NextFunction, Request, Response } from "express"
import { fetchCollectorProfile } from "../gravity"

export default function UserMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    fetchCollectorProfile(req.user.get("accessToken"))
      .then(data => {
        req.user.set("profile", data)
      })
      .then(next)
      .catch(err => {
        req.user.set("profile", {
          loyalty_applicant_at: "",
          confirmed_buyer_at: "",
        })
        next()
      })
  } else {
    next()
  }
}
