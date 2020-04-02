import { ActionType } from "./ActionType"
import {
  AuthContextModule,
  AuthIntent,
  AuthModalType,
  AuthTrigger,
} from "./Authentication"

/**
 * Schemas for individual events by ActionType
 */

export interface AuthImpression {
  action: ActionType.authImpression
  context_module: AuthContextModule
  intent: AuthIntent
  modal_copy?: string
  onboarding: boolean
  trigger: AuthTrigger
  trigger_seconds?: number
  type: AuthModalType
}
