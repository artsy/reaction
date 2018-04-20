import yup, { ValidationError } from "yup"
import { FormikActions } from "formik"
import { Field } from "./Field"

export * from "./WizardForm"
export { Field }

export type FormikHandler = <V>(values: V, bag?: FormikActions<V>) => any
export const validateYupSchemaSync = schema => values => {
  try {
    yup.object(schema).validateSync(values, { abortEarly: false })
  } catch (e) {
    if (e instanceof ValidationError) {
      let errors = {}
      e.inner.forEach(error => {
        errors[error.path] = error.message
      })
      return errors
    } else throw e
  }
  return {}
}

// Formik's validation methods FROM https://github.com/jaredpalmer/formik/blob/master/src/Formik.tsx

// /**
//  * Run validation against a Yup schema and optionally run a function if successful
//  */
// runValidationSchema = (values: FormikValues, onSuccess?: Function) => {
//   const { validationSchema } = this.props
//   const schema = isFunction(validationSchema)
//     ? validationSchema()
//     : validationSchema
//   validateYupSchema(values, schema).then(
//     () => {
//       this.setState({ errors: {} })
//       if (onSuccess) {
//         onSuccess()
//       }
//     },
//     (err: any) =>
//       this.setState({ errors: yupToFormErrors(err), isSubmitting: false })
//   )
// }

// /**
//  * Transform Yup ValidationError to a more usable object
//  */
// export function yupToFormErrors<Values>(yupError: any): FormikErrors<Values> {
//   let errors: any = {} as FormikErrors<Values>
//   for (let err of yupError.inner) {
//     if (!errors[err.path]) {
//       errors = setIn(errors, err.path, err.message)
//     }
//   }
//   return errors
// }

// /**
//  * Validate a yup schema.
//  */
// export function validateYupSchema<T extends FormikValues>(
//   values: T,
//   schema: any,
//   sync: boolean = false,
//   context: any = {}
// ): Promise<Partial<T>> {
//   let validateData: Partial<T> = {}
//   for (let k in values) {
//     if (values.hasOwnProperty(k)) {
//       const key = String(k)
//       validateData[key] = values[key] !== "" ? values[key] : undefined
//     }
//   }
//   return schema[sync ? "validateSync" : "validate"](validateData, {
//     abortEarly: false,
//     context: context,
//   })
// }
