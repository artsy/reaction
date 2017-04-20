import * as artsyPassport from "artsy-passport"
import { NextFunction, Request, Response } from "express"
import { default as IsomorphicRelay } from "isomorphic-relay"
import * as React from "react"

import { renderToString } from "react-dom/server"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import LoginContainer from "../containers/login"
import { CollectorProfileResponse } from "./gravity"
import renderPage from "./template"

import CurrentUserRoute from "../../../relay/queries/current_user"

import InquiriesContainer from "../containers/inquiries"

import { markCollectorAsLoyaltyApplicant } from "./gravity"
import { ThankYouHtml } from "./helpers"

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
  return res.send(renderPage({ styles, html, entrypoint: "", baseURL: req.baseUrl }))
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
    ({data, props}) => {
      const html = renderToString(<IsomorphicRelay.Renderer {...props} />)
      const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")
      res.locals.sharify.data.USER_DATA = req.user.toJSON()
      res.locals.sharify.data.DATA = data
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
    sharify: res.locals.sharify,
    baseURL: req.baseUrl,
  }))
}
