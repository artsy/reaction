import * as Schema from "Artsy/Analytics/Schema"
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
  intent: AuthModalIntent
}

export enum AuthModalIntent {
  FollowArtist = "follow artist",
  FollowPartner = "follow partner",
  SaveArtwork = "save artwork",
}

export const openAuthModal = (mediator: Mediator, options: ModalOptions) => {
  mediator.trigger("open:auth", {
    ...options,
  })
}

export const openAuthFromFollowSave = (
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
    case AuthModalIntent.FollowArtist:
    case AuthModalIntent.FollowPartner:
      return getMobileIntentToFollow(options)
    case AuthModalIntent.SaveArtwork:
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
  const kind = intent === AuthModalIntent.FollowArtist ? "artist" : "profile"
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

function getDesktopAuthIntent(options: AuthModalOptions): ModalOptions {
  switch (options.intent) {
    case AuthModalIntent.FollowArtist:
    case AuthModalIntent.FollowPartner:
      return getDesktopIntentToFollow(options)
    case AuthModalIntent.SaveArtwork:
      return getDesktopIntentToSaveArtwork(options)
    default:
      return undefined
  }
}

export const getDesktopIntentToFollow = ({
  entity,
  intent,
}: AuthModalOptions): ModalOptions => {
  const kind = intent === AuthModalIntent.FollowArtist ? "artist" : "profile"
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
