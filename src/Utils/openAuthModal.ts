import { AuthContextModule, AuthIntent, Intent } from "@artsy/cohesion"
import { Mediator } from "Artsy/SystemContext"
import { ModalOptions, ModalType } from "Components/Authentication/Types"
import qs from "qs"
import { data as sd } from "sharify"

export interface AuthModalOptions extends ModalOptions {
  entity: {
    slug: string
    name: string
  }
  contextModule: AuthContextModule
  intent: AuthIntent
}

const openAuthModal = (mediator: Mediator, options: ModalOptions) => {
  mediator.trigger("open:auth", options)
}

export const openAuthToFollow = (
  mediator: Mediator,
  options: AuthModalOptions
) => {
  let handled = false

  if (sd.IS_MOBILE) {
    const intent = getMobileIntent(options)
    if (intent) {
      openMobileAuth(intent)
      handled = true
    }
  } else if (mediator) {
    const intent = getDesktopIntent(options)
    if (intent) {
      openAuthModal(mediator, {
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

export const getMobileAuthLink = (mode: ModalType, options: ModalOptions) => {
  const path = mode === "login" ? "log_in" : "sign_up"
  return `/${path}?${qs.stringify(options)}`
}

function openMobileAuth(intent) {
  const href = getMobileAuthLink(ModalType.signup, {
    redirectTo: window.location.href,
    ...intent,
  })

  window.location.assign(href)
}

function getMobileIntent(options: AuthModalOptions): ModalOptions {
  switch (options.intent) {
    case Intent.followArtist:
    case Intent.followGene:
      return getMobileIntentToFollow(options)
    default:
      return undefined
  }
}

function getMobileIntentToFollow({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  const kind = intent === Intent.followArtist ? "artist" : "gene"
  return {
    action: "follow",
    contextModule,
    copy: `Sign up to follow ${entity.name}`,
    intent,
    kind,
    objectId: entity.slug,
  }
}

function getDesktopIntentToFollow({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  const kind = intent === Intent.followArtist ? "artist" : "gene"
  return {
    mode: ModalType.signup,
    contextModule,
    copy: `Sign up to follow ${entity.name}`,
    intent,
    afterSignUpAction: {
      action: "follow",
      kind,
      objectId: entity.slug,
    },
  }
}

function getDesktopIntent(options: AuthModalOptions): ModalOptions {
  switch (options.intent) {
    case Intent.followArtist:
    case Intent.followGene:
      return getDesktopIntentToFollow(options)
    default:
      return undefined
  }
}
