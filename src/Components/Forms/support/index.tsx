import { FormikActions } from "formik"
import { WizardForm } from "./WizardForm"
export { WizardForm }

export type FormikHandler = <V>(values: V, bag?: FormikActions<V>) => any
