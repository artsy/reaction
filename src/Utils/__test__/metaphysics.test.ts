jest.mock("isomorphic-fetch")
import { query as metaphysics } from "../metaphysics"

declare const global: any
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ data: {} }),
  })
)

it("Adds a user agent for reaction", () => {
  expect.assertions(1)

  return metaphysics("query {}").then(() => {
    expect(global.fetch).toBeCalledWith(undefined, {
      body: '{"query":"query {}"}',
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Reaction",
      },
      method: "POST",
    })
  })
})
