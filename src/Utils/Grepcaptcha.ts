import { data as sd } from "sharify"

export const Grepcaptcha = (action: GrepcaptchaAction, cb?: any) => {
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

export enum GrepcaptchaAction {
  ForgotSubmit = "forgot_submit",
  LoginSubmit = "login_submit",
  SignupSubmit = "signup_submit",
}
