import { ContextModule } from "Artsy/Analytics/Schema/Values"

export interface AuthImpression {
  context_module: ContextModule
  trigger: string
  intent: string
  type: "auth_impression"
  onboarding: boolean
  trigger_seconds: number
}

export const AuthImpression = () => {
  return {
    type: "auth_impression",
  }
}
