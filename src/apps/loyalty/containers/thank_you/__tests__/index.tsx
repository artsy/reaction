import * as React from "react"
import { renderToString } from "react-dom/server"
import ThankYouContainer from "../index"

describe("ThankYouHTML", () => {
  it("renders the acb template for confirmed buyers", () => {
    const profile = { confirmed_buyer_at: "trust me im a buyer" } as CollectorProfile
    const html = renderToString(<ThankYouContainer profile={profile} recentApplicant />)
    expect(html).toMatch("EARLY ACCESS")
  })

  it("renders the repeat visitor template when revisiting the page", () => {
    const html = renderToString(<ThankYouContainer profile={{} as CollectorProfile} recentApplicant={false} />)
    expect(html).toMatch("Your purchases are being reviewed")
  })
})
