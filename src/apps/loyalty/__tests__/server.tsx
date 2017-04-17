import { Home, Login } from "../server/route_handlers"

describe ("Home page", () => {
  it("redirects to /inquiries", () => {
    let req = { baseUrl: "loyalty" } as any
    let res = { redirect: jest.fn() } as any
    let next = jest.fn() as any
    Home(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith("loyalty/inquiries")
  })
})

describe ("Login page", () => {
  it("renders the login page", () => {
    let req = { baseUrl: "loyalty", csrfToken: () => "token" } as any
    let res = { redirect: jest.fn(), send: jest.fn() } as any
    let next = jest.fn() as any
    Login(req, res, next)
    expect(res.send).toHaveBeenCalledWith("test")
  })
})
