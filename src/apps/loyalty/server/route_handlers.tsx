import * as artsyPassport from "artsy-passport"
import { NextFunction, Request, Response } from "express"
import * as React from "react"

import { renderToString } from "react-dom/server"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import LoginContainer from "../containers/login"
import { CollectorProfileResponse } from "./gravity"
import renderPage from "./template"

import ThreewThankYou from "../containers/3w_thank_you"
import AcbThankYou from "../containers/acb_thank_you"

export function Home(req: Request, res: Response, next: NextFunction) {
  return res.redirect(req.baseUrl + "/inquiries")
}

export function ThankYouHtml(info: CollectorProfileResponse, userName?: string): string {
  if (info.confirmed_buyer_at) {
    return renderToString(<AcbThankYou />)
  }
  return renderToString(<ThreewThankYou userName={userName} />)
}

export function ThankYou(req: Request, res: Response, next: NextFunction) {
  const { loginPagePath } = artsyPassport.options
  if (!req.user) {
    return res.redirect(req.baseUrl + loginPagePath)
  }

  const info = req.user.get("profile")
  let html

  if (info.loyalty_applicant_at) {
    html = ThankYouHtml(info, req.user.attributes.name)
  } else {
    return res.redirect(req.baseUrl) // baseUrl already has "/loyalty" so no need to append it.
  }

  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")
  return res.send(renderPage({ styles, html, entrypoint: "", baseURL: req.baseUrl }))
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
