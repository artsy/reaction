import { FormikHandler } from "../Forms/support"

export interface RenderProps {
  validate?: () => any | FormikHandler
  validationSchema?: () => any | FormikHandler
  next: (v: any) => void
  previous: (v: any) => void
  onComplete: (v: any) => void
  pageIndex: number
  pages?: WizardSteps
  values?: any
}

// This interface is shared with StepMarker and could be two separate things
export interface Step {
  label: string
  // TODO: Fix typing here and in WizardForm
  component: any | React.ComponentType<RenderProps>
  stepName: string
  validate?: any
  validationSchema?: any
}
export type WizardSteps<S = Step> = S[]
