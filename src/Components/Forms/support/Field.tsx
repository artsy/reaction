import { Field as FormikField } from "formik"
import React from "react"
import { default as Input, InputProps } from "../../Input"

interface FieldProps extends InputProps {
  name: string
  type: string
}
/**
 * A text input with the standard FormimkProps added for rendering niceness
 */
export const Field: (props: FieldProps) => any = props => {
  const { name, type, placeholder, ref, ...inputProps } = props
  return (
    <FormikField
      name={name}
      type={type}
      placeholder={placeholder}
      render={({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...restProps
      }) => (
        <div>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            error={touched[name] && errors[name]}
            value={values[name]}
            {...restProps}
            {...inputProps}
          />
        </div>
      )}
    />
  )
}
