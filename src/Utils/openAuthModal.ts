import * as Schema from "Artsy/Analytics/Schema"
import { Mediator } from "Artsy/SystemContext"
import { stringify } from "qs"
import { data as sd } from "sharify"

interface AuthReason {
  entity: {
    id: string
    name: string
  }
  contextModule: Schema.ContextModule | string
  intent: AuthModalIntent
}

export enum AuthModalIntent {
  FollowArtist = "FollowArtist",
}

export const openAuthModal = (mediator: Mediator, reason: AuthReason) => {
  if (sd.IS_MOBILE) {
    const intent = getMobileAuthIntent(reason)
    if (intent) {
      openMobileAuth(intent)
    }
  } else if (mediator) {
    const intent = getDesktopAuthIntent(reason)
    if (intent) {
      openDesktopAuth(mediator, intent)
    }
  } else {
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

function getMobileAuthIntent(reason: AuthReason) {
  switch (reason.intent) {
    case AuthModalIntent.FollowArtist:
      return getMobileIntentToFollowArtist(reason)
    default:
      return undefined
  }
}

function getMobileIntentToFollowArtist({ contextModule, entity }: AuthReason) {
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

function getDesktopAuthIntent(reason: AuthReason) {
  switch (reason.intent) {
    case AuthModalIntent.FollowArtist:
      return getDesktopIntentToFollowArtist(reason)
    default:
      return undefined
  }
}

function getDesktopIntentToFollowArtist({ entity }: AuthReason) {
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
