import { FormikActions, FormikProps } from "formik"

export type FormValues = { [key: string]: any } | null
export type FormErrors = { [key: string]: any } | null

export type StepElement = React.ReactElement<StepProps>

export interface StepProps {
  label?: string
  validate?: (values: FormValues) => FormErrors
  validationSchema?: object
  children: (props: { form: any; wizard: any }) => React.ReactElement<any>
  onSubmit?: (
    values: FormValues,
    actions?: FormikActions<FormValues>
  ) => boolean | Promise<boolean>
}

export interface WizardRenderProps {
  currentStep: StepElement
  isLastStep: boolean
  previous: (e: React.FormEvent<any> | null, values: FormValues) => void
  next: (e: React.FormEvent<any> | null, values: FormValues) => void
  currentStepIndex: number
  steps: StepElement[]
  shouldAllowNext: boolean
  progressPercentage: number
}

export interface WizardContext {
  wizard: WizardRenderProps
  form: FormikProps<any>
}
