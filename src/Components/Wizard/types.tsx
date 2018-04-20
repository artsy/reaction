import { FormikHandler } from "../Forms/support"

export interface RenderProps {
  validate?: () => any | FormikHandler
  next: (v: any) => void
  previous: (v: any) => void
  onComplete: (v: any) => void
  pageIndex: number
  pages?: WizardSchema
  values?: any
}

// This interface is shared with StepMarker and could be two separate things
export interface Step {
  label: string
  // TODO: Fix typing here and in WizardForm
  component: any | React.ComponentType<RenderProps>
  stepName: string
  validate?: any
}
export type WizardSchema<S = Step> = S[]
