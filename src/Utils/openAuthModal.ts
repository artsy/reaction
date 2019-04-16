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
}

export const openAuthModal = (mediator: Mediator, reason: AuthReason) => {
  if (sd.IS_MOBILE) {
    openMobileAuth(reason)
  } else if (mediator) {
    openDesktopAuth(mediator, reason)
  } else {
    window.location.href = "/login"
  }
}

const openMobileAuth = ({ entity, contextModule }) => {
  const params = stringify({
    action: "follow",
    contextModule,
    intent: "follow artist",
    kind: "artist",
    objectId: entity.id,
    signUpIntent: "follow artist",
    trigger: "click",
    entityName: entity.name,
  })
  const href = `/sign_up?redirect-to=${window.location}&${params}`

  window.location.href = href
}

const openDesktopAuth = (mediator, { entity }) => {
  mediator.trigger("open:auth", {
    mode: "signup",
    copy: `Sign up to follow ${entity.name}`,
    signupIntent: "follow artist",
    afterSignUpAction: {
      kind: "artist",
      action: "follow",
      objectId: entity.id,
    },
  })
}
