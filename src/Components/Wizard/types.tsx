export interface RenderProps<V = {}> {
  validate?: (values: V) => Partial<V>
  validationSchema?: () => any
  next: (values: V) => void
  previous: () => void
  onComplete: (values: V) => void
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
