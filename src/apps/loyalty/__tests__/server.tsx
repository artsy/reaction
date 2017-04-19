import { ThankYouHtml } from "../server/helpers"
import { Home, ThankYou } from "../server/route_handlers"

describe ("Home page", () => {
  it("redirects to /inquiries", () => {
    let req = { baseUrl: "loyalty" } as any
    let res = { redirect: jest.fn() } as any
    let next = jest.fn() as any
    Home(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith("loyalty/inquiries")
  })
})

describe("ThankYouHTML", () => {
  it("renders the acb template for confirmed buyers", () => {
    let profile = { confirmed_buyer_at: "trust me im a buyer" } as any
    let html = ThankYouHtml(profile, null, true)
    expect(html).toMatch("EARLY ACCESS")
  })
  it("renders the repeat visitor template when revisiting the page", () => {
    let html = ThankYouHtml({} as any, null, false)
    expect(html).toMatch("Your purchases are being reviewed")
  })
})

describe ("ThankYou page", () => {
  it("redirects to /login if there is no user", () => {
    let req = { baseUrl: "loyalty" } as any
    let res = { redirect: jest.fn() } as any
    let next = jest.fn() as any
    ThankYou(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith("loyalty/login")
  })

  it("redirects to /loyalty if the user is not a loyalty applicant", () => {
    let get = () => {
      return {
        loyalty_applicant_at: null,
      }
    }
    let req = { baseUrl: "loyalty", user: { get } } as any
    let res = { redirect: jest.fn() } as any
    let next = jest.fn() as any
    ThankYou(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith("loyalty")
  })
})
