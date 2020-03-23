import * as Schema from "Artsy/Analytics/v2/Schema"
import { Mediator } from "Artsy/SystemContext"
import { ModalOptions, ModalType } from "Components/Authentication/Types"
import { stringify } from "qs"
import { data as sd } from "sharify"

export interface AuthModalOptions extends ModalOptions {
  entity: {
    slug: string
    name: string
  }
  contextModule: Schema.ContextModule
  intent: Schema.AuthIntent
}

export const openAuthModal = (mediator: Mediator, options: ModalOptions) => {
  mediator.trigger("open:auth", options)
}

export const openAuthToFollowSave = (
  mediator: Mediator,
  options: AuthModalOptions
) => {
  let handled = false

  if (sd.IS_MOBILE) {
    const intent = getMobileAuthIntent(options)
    if (intent) {
      openMobileAuth(intent)
      handled = true
    }
  } else if (mediator) {
    const intent = getDesktopAuthIntent(options)
    if (intent) {
      mediator.trigger("open:auth", {
        mode: ModalType.signup,
        ...intent,
      })
      handled = true
    }
  }

  if (!handled) {
    window.location.assign("/login")
  }
}

function openMobileAuth(intent) {
  const params = stringify(intent)
  const href = `/sign_up?redirect-to=${window.location}&${params}`

  window.location.assign(href)
}

function getMobileAuthIntent(options: AuthModalOptions): ModalOptions {
  switch (options.intent) {
    case Schema.AuthIntent.followArtist:
    case Schema.AuthIntent.followGallery:
      return getMobileIntentToFollow(options)
    case Schema.AuthIntent.saveArtwork:
      return getMobileIntentToSaveArtwork(options)
    default:
      return undefined
  }
}

function getMobileIntentToFollow({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  const kind = intent === Schema.AuthIntent.followArtist ? "artist" : "profile"
  return {
    action: "follow",
    contextModule,
    copy: `Sign up to follow ${entity.name}`,
    intent,
    kind,
    objectId: entity.slug,
  }
}

function getMobileIntentToSaveArtwork({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  return {
    action: "save",
    contextModule,
    copy: `Sign up to save artworks`,
    intent,
    kind: "artworks",
    objectId: entity.slug,
  }
}

function getDesktopIntentToFollow({
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  const kind = intent === Schema.AuthIntent.followArtist ? "artist" : "profile"
  return {
    mode: ModalType.signup,
    copy: `Sign up to follow ${entity.name}`,
    intent,
    afterSignUpAction: {
      action: "follow",
      kind,
      objectId: entity.slug,
    },
  }
}

function getDesktopIntentToSaveArtwork({
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  return {
    mode: ModalType.signup,
    copy: `Sign up to save artworks`,
    intent,
    afterSignUpAction: {
      action: "save",
      kind: "artworks",
      objectId: entity.slug,
    },
  }
}

function getDesktopAuthIntent(options: AuthModalOptions): ModalOptions {
  switch (options.intent) {
    case Schema.AuthIntent.followArtist:
    case Schema.AuthIntent.followGallery:
      return getDesktopIntentToFollow(options)
    case Schema.AuthIntent.saveArtwork:
      return getDesktopIntentToSaveArtwork(options)
    default:
      return undefined
  }
}
