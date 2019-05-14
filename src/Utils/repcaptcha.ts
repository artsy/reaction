import { data as sd } from "sharify"

export const repcaptcha = (action: RepcaptchaAction, cb?: any) => {
  if (sd.RECAPTCHA_KEY) {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(sd.RECAPTCHA_KEY, {
          action,
        })
        cb && cb(token)
      } catch (e) {
        console.log(e)
        cb && cb()
      }
    })
  } else {
    cb && cb()
  }
}

export type RepcaptchaAction =
  | "home"
  | "forgot_submit"
  | "login_submit"
  | "signup_submit"
