import { ContextModule, Intent } from "@artsy/cohesion"
import { AuthModalOptions, openAuthToFollow } from "../openAuthModal"

jest.mock("sharify", () => ({ data: jest.fn() }))
const sd = require("sharify").data

const artistArgs: AuthModalOptions = {
  contextModule: ContextModule.artistHeader,
  entity: {
    slug: "andy-warhol",
    name: "Andy Warhol",
  },
  intent: Intent.followArtist,
}

const geneArgs: AuthModalOptions = {
  contextModule: ContextModule.aboutTheWork,
  entity: {
    slug: "surrealism",
    name: "Surrealism",
  },
  intent: Intent.followGene,
}

describe("openAuth Helpers", () => {
  let mediator

  beforeEach(() => {
    mediator = {
      trigger: jest.fn(),
    }
    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: "http://localhost/", assign: jest.fn() },
    })
  })

  describe("#openAuthToFollow", () => {
    describe("desktop", () => {
      it("transforms args for following artists", () => {
        openAuthToFollow(mediator, artistArgs)

        expect(mediator.trigger).toBeCalledWith("open:auth", {
          afterSignUpAction: {
            action: "follow",
            kind: "artist",
            objectId: "andy-warhol",
          },
          contextModule: "artistHeader",
          copy: "Sign up to follow Andy Warhol",
          intent: "followArtist",
          mode: "signup",
        })
      })

      it("transforms args for following genes", () => {
        openAuthToFollow(mediator, geneArgs)

        expect(mediator.trigger).toBeCalledWith("open:auth", {
          afterSignUpAction: {
            action: "follow",
            kind: "gene",
            objectId: "surrealism",
          },
          contextModule: "aboutTheWork",
          copy: "Sign up to follow Surrealism",
          intent: "followGene",
          mode: "signup",
        })
      })
    })

    describe("mobile", () => {
      beforeEach(() => {
        sd.IS_MOBILE = true
      })

      it("transforms args for following artists", () => {
        openAuthToFollow(mediator, artistArgs)
        expect(window.location.assign).toBeCalledWith(
          "/sign_up?redirectTo=http%3A%2F%2Flocalhost%2F&action=follow&contextModule=artistHeader&copy=Sign%20up%20to%20follow%20Andy%20Warhol&intent=followArtist&kind=artist&objectId=andy-warhol"
        )
        expect(mediator.trigger).not.toBeCalled()
      })

      it("transforms args for following partners", () => {
        openAuthToFollow(mediator, geneArgs)
        expect(window.location.assign).toBeCalledWith(
          "/sign_up?redirectTo=http%3A%2F%2Flocalhost%2F&action=follow&contextModule=aboutTheWork&copy=Sign%20up%20to%20follow%20Surrealism&intent=followGene&kind=gene&objectId=surrealism"
        )
        expect(mediator.trigger).not.toBeCalled()
      })
    })
  })
})
