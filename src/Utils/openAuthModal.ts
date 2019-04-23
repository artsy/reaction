import * as Schema from "Artsy/Analytics/Schema"
import { Mediator } from "Artsy/SystemContext"
import { stringify } from "qs"
import { data as sd } from "sharify"

interface AuthReason {
  entity: {
    id: string
    name: string
  }
  contextModule: Schema.ContextModule
  intent: AuthModalIntent
}

export enum AuthModalIntent {
  FollowArtist = "FollowArtist",
  FollowPartner = "FollowPartner",
  SaveArtwork = "SaveArtwork",
}

export const openAuthModal = (mediator: Mediator, reason: AuthReason) => {
  let handled = false

  if (sd.IS_MOBILE) {
    const intent = getMobileAuthIntent(reason)
    if (intent) {
      openMobileAuth(intent)
      handled = true
    }
  } else if (mediator) {
    const intent = getDesktopAuthIntent(reason)
    if (intent) {
      openDesktopAuth(mediator, intent)
      handled = true
    }
  }

  if (!handled) {
    window.location.href = "/login"
  }
}

function openMobileAuth(intent) {
  const params = stringify(intent)
  const href = `/sign_up?redirect-to=${window.location}&${params}`

  window.location.href = href
}

function openDesktopAuth(mediator, intent) {
  mediator.trigger("open:auth", intent)
}

interface MobileIntent {
  action: string
  contextModule: Schema.ContextModule | string
  intent: string
  kind: string
  objectId: string
  signUpIntent: string
  trigger: string
  entityName: string
}

function getMobileAuthIntent(reason: AuthReason): MobileIntent {
  switch (reason.intent) {
    case AuthModalIntent.FollowArtist:
      return getMobileIntentToFollowArtist(reason)
    case AuthModalIntent.FollowPartner:
      return getMobileIntentToFollowPartner(reason)
    case AuthModalIntent.SaveArtwork:
      return getMobileIntentToSaveArtwork(reason)
    default:
      return undefined
  }
}

function getMobileIntentToFollowArtist({
  contextModule,
  entity,
}: AuthReason): MobileIntent {
  return {
    action: "follow",
    contextModule,
    intent: "follow artist",
    kind: "artist",
    objectId: entity.id,
    signUpIntent: "follow artist",
    trigger: "click",
    entityName: entity.name,
  }
}

function getMobileIntentToFollowPartner({
  contextModule,
  entity,
}: AuthReason): MobileIntent {
  return {
    action: "follow",
    contextModule,
    intent: "follow partner",
    kind: "gallery",
    objectId: entity.id,
    signUpIntent: "follow partner",
    trigger: "click",
    entityName: entity.name,
  }
}

function getMobileIntentToSaveArtwork({
  contextModule,
  entity,
}: AuthReason): MobileIntent {
  return {
    action: "save",
    contextModule,
    intent: "save artwork",
    kind: "artwork",
    objectId: entity.id,
    signUpIntent: "save artwork",
    trigger: "click",
    entityName: entity.name,
  }
}

interface DesktopIntent {
  mode: string
  copy: string
  intent?: string
  signupIntent: string
  trigger?: string
  afterSignUpAction: {
    kind?: string
    action: string
    objectId: string
  }
}

function getDesktopAuthIntent(reason: AuthReason): DesktopIntent {
  switch (reason.intent) {
    case AuthModalIntent.FollowArtist:
      return getDesktopIntentToFollowArtist(reason)
    case AuthModalIntent.FollowPartner:
      return getDesktopIntentToFollowPartner(reason)
    case AuthModalIntent.SaveArtwork:
      return getDesktopIntentToSaveArtwork(reason)
    default:
      return undefined
  }
}

function getDesktopIntentToFollowArtist({ entity }: AuthReason): DesktopIntent {
  return {
    mode: "signup",
    copy: `Sign up to follow ${entity.name}`,
    signupIntent: "follow artist",
    afterSignUpAction: {
      kind: "artist",
      action: "follow",
      objectId: entity.id,
    },
  }
}

function getDesktopIntentToFollowPartner({
  entity,
}: AuthReason): DesktopIntent {
  return {
    mode: "signup",
    copy: `Sign up to follow ${entity.name}`,
    signupIntent: "follow partner",
    afterSignUpAction: {
      kind: "profile", // should this be "partner"?
      action: "follow",
      objectId: entity.id,
    },
  }
}

function getDesktopIntentToSaveArtwork({ entity }: AuthReason): DesktopIntent {
  return {
    mode: "signup",
    copy: `Sign up to save artworks`,
    intent: "save artwork",
    signupIntent: "save artwork",
    trigger: "click",
    afterSignUpAction: {
      action: "save",
      objectId: entity.id,
    },
  }
}
