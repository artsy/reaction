import { data as sd } from "sharify"

export const recaptcha = (action: RecaptchaAction, cb?: any) => {
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

export type RecaptchaAction =
  | "forgot_submit"
  | "home"
  | "inquiry_forgot_impression"
  | "inquiry_impression"
  | "inquiry_login_impression"
  | "inquiry_register_impression"
  | "login_submit"
  | "signup_submit"
