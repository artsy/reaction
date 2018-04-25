import { FormikProps } from "formik"

export type FormValues = { [key: string]: any } | null
export type FormErrors = { [key: string]: any } | null

export type StepElement = React.ReactElement<StepProps>

export interface StepProps {
  label?: string
  validate?: (values: FormValues) => FormErrors
  validationSchema?: object
  children: (props: { form: any; wizard: any }) => React.ReactElement<any>
}

export interface WizardRenderProps {
  currentStep: StepElement
  isLastStep: boolean
  previous: (e: React.FormEvent<any> | null, values: FormValues) => void
  next: (e: React.FormEvent<any> | null, values: FormValues) => void
  currentStepIndex: number
  steps: StepElement[]
}

export interface WizardContext {
  wizard: WizardRenderProps
  form: FormikProps<any>
}
