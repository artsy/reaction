import { Field as FormikField } from "formik"
import React from "react"
import { default as Input } from "../../Input"

/**
 * A text input with the standard FormimkProps added for rendering niceness
 */
export const Field: (props: any) => any = props => {
  const { name, type, placeholder, block, title } = props
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
            title={title}
            block={block}
            type={type}
            placeholder={placeholder}
            error={touched[name] && errors[name]}
            value={values[name]}
            {...restProps}
          />
        </div>
      )}
    />
  )
}
