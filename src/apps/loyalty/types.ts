import * as sharify from "sharify"

export interface FormData {
  baseUrl: string,
  url: string,
  csrfToken: string,
  forgotPasswordUrl: string,
  facebookPath: string,
  twitterPath: string,
}

export interface ResponseLocalData extends sharify.ResponseLocalData {
  FORM_DATA?: FormData
}
