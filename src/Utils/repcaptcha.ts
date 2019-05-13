import { data as sd } from "sharify"

export const repcaptcha = (action: RepcaptchaAction, cb?: any) => {
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
}

export type RepcaptchaAction =
  | "home"
  | "forgot_submit"
  | "login_submit"
  | "signup_submit"
