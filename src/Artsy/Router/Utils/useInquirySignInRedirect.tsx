import { useSystemContext } from "Artsy/SystemContext"
import { RouterContext } from "found"
import { useContext, useEffect, useState } from "react"

export function useInquirySignInRedirect() {
  /**
   * We need to listen to login / signup events from the inquiry form on the
   * artwork page. If we detect a login event, temporarily disable the shell
   * so that when a user clicks to another artwork or page, a full reload
   * will occur, which properly establishes a logged in state
   */
  const { mediator } = useSystemContext()

  const {
    match: {
      location: { pathname: pathnameAfterInquirySignIn },
    },
  } = useContext(RouterContext)

  const [loggedInFromInquiryFlow, setLoggedInFromInquiryFlow] = useState(false)
  useEffect(() => {
    mediator.on("auth:login:inquiry_form", loggedInUser => {
      console.warn("DETECTED LOGIN")
      setLoggedInFromInquiryFlow(true)
    })

    return () => {
      mediator.off("auth:login:inquiry_form")
    }
  }, [])

  useEffect(() => {
    console.log(loggedInFromInquiryFlow)
    if (loggedInFromInquiryFlow) {
      console.warn("FOUND LOGIN, redirecting...", pathnameAfterInquirySignIn)
      window.location.assign(pathnameAfterInquirySignIn)
    }
  }, [pathnameAfterInquirySignIn])
}
