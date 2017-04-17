import * as artsyPassport from "artsy-passport"
import { NextFunction, Request, Response } from "express"
import * as React from "react"

import { renderToString } from "react-dom/server"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import LoginContainer from "../containers/login"
import renderPage from "./template"

export function Home(req: Request, res: Response, next: NextFunction) {
  return res.redirect(req.baseUrl + "/inquiries")
}

export function Login(req: Request, res: Response, next: NextFunction) {
  const {
    facebookPath,
    twitterPath,
  } = artsyPassport.options
  const formConfig = {
    url: `${req.baseUrl + req.path}?redirect-to=${req.baseUrl + "/inquiries/"}`,
    csrfToken: req.csrfToken(),
    facebookPath,
    twitterPath,
  }
  const html = renderToString(<LoginContainer form={formConfig} />)
  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")

  res.locals.sharify.data.FORM_DATA = formConfig

  return res.send(renderPage({
    styles,
    html,
    entrypoint: req.baseUrl + "/bundles/login.js",
    sharify: res.locals.sharify.script(),
    baseURL: req.baseUrl,
  }))
}
