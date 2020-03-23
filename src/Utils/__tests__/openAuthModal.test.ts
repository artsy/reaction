import * as Schema from "Artsy/Analytics/Schema"
import { ModalType } from "Components/Authentication/Types"
import {
  AuthModalIntent,
  AuthModalOptions,
  openAuthModal,
  openAuthToFollowSave,
} from "../openAuthModal"

jest.mock("sharify", () => ({ data: jest.fn() }))
const sd = require("sharify").data

const artistArgs: AuthModalOptions = {
  contextModule: Schema.ContextModule.ArtistPage,
  entity: {
    slug: "andy-warhol",
    name: "Andy Warhol",
  },
  intent: AuthModalIntent.FollowArtist,
}

const partnerArgs: AuthModalOptions = {
  contextModule: Schema.ContextModule.AboutTheWorkPartner,
  entity: {
    slug: "david-zwirner",
    name: "David Zwirner",
  },
  intent: AuthModalIntent.FollowPartner,
}

const artworkArgs: AuthModalOptions = {
  contextModule: Schema.ContextModule.ArtworkPage,
  entity: {
    slug: "andy-warhol-skull",
    name: "Skull",
  },
  intent: AuthModalIntent.SaveArtwork,
}

describe("openAuth Helpers", () => {
  let mediator

  beforeEach(() => {
    mediator = {
      trigger: jest.fn(),
    }
    window.location.assign = jest.fn()
  })

  describe("#openAuthModal", () => {
    it("calls the mediator with expected args", () => {
      openAuthModal(mediator, {
        mode: ModalType.signup,
        intent: "signup",
        contextModule: "header",
        copy: "Sign up to do cool stuff",
      })

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "header",
        copy: "Sign up to do cool stuff",
        intent: "signup",
        mode: "signup",
      })
    })
  })

  describe("#openAuthToFollowSave", () => {
    describe("desktop", () => {
      it("transforms args for following artists", () => {
        openAuthToFollowSave(mediator, artistArgs)

        expect(mediator.trigger).toBeCalledWith("open:auth", {
          afterSignUpAction: {
            action: "follow",
            kind: "artist",
            objectId: "andy-warhol",
          },
          copy: "Sign up to follow Andy Warhol",
          intent: "follow artist",
          mode: "signup",
        })
      })

      it("transforms args for following partners", () => {
        openAuthToFollowSave(mediator, partnerArgs)

        expect(mediator.trigger).toBeCalledWith("open:auth", {
          afterSignUpAction: {
            action: "follow",
            kind: "profile",
            objectId: "david-zwirner",
          },
          copy: "Sign up to follow David Zwirner",
          intent: "follow partner",
          mode: "signup",
        })
      })

      it("transforms args for saving artworks", () => {
        openAuthToFollowSave(mediator, artworkArgs)

        expect(mediator.trigger).toBeCalledWith("open:auth", {
          afterSignUpAction: {
            action: "save",
            kind: "artworks",
            objectId: "andy-warhol-skull",
          },
          copy: "Sign up to save artworks",
          intent: "save artwork",
          mode: "signup",
        })
      })
    })

    describe("mobile", () => {
      beforeEach(() => {
        sd.IS_MOBILE = true
      })

      it("transforms args for following artists", () => {
        openAuthToFollowSave(mediator, artistArgs)
        expect(window.location.assign).toBeCalledWith(
          "/sign_up?redirect-to=http://localhost/&action=follow&contextModule=Artist%20page&copy=Sign%20up%20to%20follow%20Andy%20Warhol&intent=follow%20artist&kind=artist&objectId=andy-warhol"
        )
        expect(mediator.trigger).not.toBeCalled()
      })

      it("transforms args for following partners", () => {
        openAuthToFollowSave(mediator, partnerArgs)
        expect(window.location.assign).toBeCalledWith(
          "/sign_up?redirect-to=http://localhost/&action=follow&contextModule=About%20the%20Work%20%28Partner%29&copy=Sign%20up%20to%20follow%20David%20Zwirner&intent=follow%20partner&kind=profile&objectId=david-zwirner"
        )
        expect(mediator.trigger).not.toBeCalled()
      })

      it("transforms args for saving artworks", () => {
        openAuthToFollowSave(mediator, artworkArgs)
        expect(window.location.assign).toBeCalledWith(
          "/sign_up?redirect-to=http://localhost/&action=save&contextModule=Artwork%20page&copy=Sign%20up%20to%20save%20artworks&intent=save%20artwork&kind=artworks&objectId=andy-warhol-skull"
        )
        expect(mediator.trigger).not.toBeCalled()
      })
    })
  })
})
