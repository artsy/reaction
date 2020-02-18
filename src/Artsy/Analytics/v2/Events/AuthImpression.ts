import { ActionTypes } from "./Types"

/*
 * the component where the modal was triggered.
 */
export type ContextModule = "header"

/**
 * the type of modal to display.
 */
export type Type = "signup" | "login" | "forgot"

/**
 * the action taken that prompted user to signup or login.
 */
export type Intent =
  | "signup"
  | "login"
  | "forgot"
  | "followArtist"
  | "followGene"

/**
 * the type of action that opened the modal
 */
export type Trigger = "click" | "timed"

export interface AuthImpression {
  action: ActionTypes.AuthImpression
  context_module: ContextModule
  intent: Intent
  modal_copy?: string
  onboarding: boolean
  trigger: Trigger
  trigger_seconds?: number
  type: Type
}

export interface AuthImpressionArgs {
  copy?: string
  contextModule: ContextModule
  intent: Intent
  onboarding?: boolean
  trigger?: Trigger
  triggerSeconds?: number
  type: Type
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
    action: ActionTypes.AuthImpression,
    context_module: contextModule,
    intent,
    modal_copy: copy,
    onboarding: onboarding || false,
    trigger: trigger || (triggerSeconds && "timed") || "click",
    trigger_seconds: triggerSeconds,
    type,
  }
}
