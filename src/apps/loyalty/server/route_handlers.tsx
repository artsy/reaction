import * as artsyPassport from "artsy-passport"
import * as artsyXapp from "artsy-xapp"
import { NextFunction, Request, Response } from "express"
import { default as IsomorphicRelay } from "isomorphic-relay"
import * as React from "react"
import { renderToString } from "react-dom/server"
import * as styleSheet from "styled-components/lib/models/StyleSheet"

import CurrentUserRoute from "../../../relay/queries/current_user"

import ForgotPasswordContainer from "../containers/forgot_password"
import InquiriesContainer from "../containers/inquiries"
import LoginContainer from "../containers/login"

import { markCollectorAsLoyaltyApplicant } from "./gravity"
import { ThankYouHtml } from "./helpers"
import renderPage from "./template"

import * as Artsy from "../../../components/artsy"
import { FormData, ResponseLocalData } from "../types"

export function Home(req: Request, res: Response, next: NextFunction) {
  return res.redirect(req.baseUrl + "/inquiries")
}

export function ThankYou(req: Request, res: Response, next: NextFunction) {
  const { loginPagePath } = artsyPassport.options
  if (!req.user) {
    return res.redirect(req.baseUrl + loginPagePath)
  }

  const info = req.user.get("profile")
  let html

  if (info.loyalty_applicant_at) {
    html = ThankYouHtml(info, req.user.attributes.name, req.query.recent_applicant)
  } else {
    return res.redirect(req.baseUrl) // baseUrl already has "/loyalty" so no need to append it.
  }

  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")
  return res.send(renderPage({ styles, html, entrypoint: "", baseURL: req.baseUrl, sharify: res.locals.sharify }))
}

export function Inquiries(req: Request, res: Response, next: NextFunction) {
  const { loginPagePath } = artsyPassport.options
  if (!req.user) {
    return res.redirect(req.baseUrl + loginPagePath)
  }

  const info = req.user.get("profile")
  if (info.loyalty_applicant_at) {
    return res.redirect(req.baseUrl + "/thank-you")
  }

  if (info.confirmed_buyer_at) {
    markCollectorAsLoyaltyApplicant(req.user.get("accessToken"))
      .then(profile => {
        return res.redirect(req.baseUrl + "/thank-you")
      })
      .catch(err => console.error(err))
  }

  IsomorphicRelay.prepareData({
    Container: InquiriesContainer,
    queryConfig: new CurrentUserRoute(),
  }, res.locals.networkLayer).then(
    ({ data, props }) => {
      const html = renderToString(
        <Artsy.ContextProvider currentUser={res.locals.sharify.data.CURRENT_USER}>
          <IsomorphicRelay.Renderer {...props} />
        </Artsy.ContextProvider>,
      )
      const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")
      res.locals.sharify.data.RELAY_DATA = data
      return res.send(renderPage({
        styles,
        html,
        entrypoint: req.baseUrl + "/bundles/inquiries.js",
        sharify: res.locals.sharify,
        baseURL: req.baseUrl,
      }))
    })
}

export function Login(req: Request, res: Response, next: NextFunction) {
  const {
    facebookPath,
    twitterPath,
  } = artsyPassport.options
  const formConfig: FormData = {
    baseUrl: req.baseUrl,
    url: `${req.baseUrl + req.path}?redirect-to=${req.baseUrl + "/inquiries/"}`,
    forgotPasswordUrl: req.baseUrl + "/forgot-password",
    csrfToken: req.csrfToken(),
    facebookPath,
    twitterPath,
  }

  const html = renderToString(<LoginContainer form={formConfig} />)
  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")

  const data = res.locals.sharify.data as ResponseLocalData
  data.FORM_DATA = formConfig

  return res.send(renderPage({
    styles,
    html,
    entrypoint: req.baseUrl + "/bundles/login.js",
    sharify: res.locals.sharify,
    baseURL: req.baseUrl,
  }))
}

export function ForgotPassword(req: Request, res: Response, next: NextFunction) {
  const submitUrl = process.env.API_URL + "/api/v1/users/send_reset_password_instructions"
  const html = renderToString(<ForgotPasswordContainer submitEmailUrl={submitUrl} appToken={artsyXapp.token} />)
  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")

  res.locals.sharify.data.SUBMIT_URL = submitUrl
  res.locals.sharify.data.APP_TOKEN = artsyXapp.token

  return res.send(renderPage({
    styles,
    html,
    entrypoint: req.baseUrl + "/bundles/forgot_password.js",
    baseURL: req.baseUrl,
    sharify: res.locals.sharify,
  }))
}
