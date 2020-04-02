import {
  ActionType,
  AuthContextModule,
  AuthImpression,
  AuthIntent,
  AuthModalType,
  AuthTrigger,
} from "../Schema"

interface AuthImpressionArgs {
  copy?: string
  contextModule: AuthContextModule
  intent: AuthIntent
  onboarding?: boolean
  trigger?: AuthTrigger
  triggerSeconds?: number
  type: AuthModalType
}

/**
 * Action fired when an auth form is viewed
 *
 * @example
 * authImpression({
 *   contextModule: "header",
 *   intent: "signup",
 *   type: "signup",
 * })
 */
export const authImpression = ({
  contextModule,
  intent,
  copy,
  onboarding,
  trigger,
  triggerSeconds,
  type,
}: AuthImpressionArgs): AuthImpression => {
  return {
    action: ActionType.authImpression,
    context_module: contextModule,
    intent,
    modal_copy: copy,
    onboarding: onboarding || false,
    trigger: trigger || (triggerSeconds && "timed") || "click",
    trigger_seconds: triggerSeconds,
    type,
  }
}
