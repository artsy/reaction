import { ReactNode } from "react"

export interface RenderProps {
  nextStep: () => void
  previousStep: () => void
  gotoStep: (index: number) => void
  stepState: State
  isComplete: () => boolean
}

export interface Props {
  children?: (renderProps: RenderProps) => ReactNode | void
  steps: Step[]
  style?: any
  onChange?: any
  currentStepIndex: number
}

export interface State {
  currentStepIndex: number
  steps: StepState[]
}

export type StepState = Step & { isActive: boolean; isComplete: boolean }

export interface Step {
  label: string
  onClick?: any
}
