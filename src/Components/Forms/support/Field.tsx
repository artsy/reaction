import React from "react"
import { Field as FormikField } from "formik"
import { default as Input } from "../../Input"

// export interface FormikInputProps<T> extends InputProps {}

/**
 * An input with the standard FormimkProps added for rendering niceness
 */
export const Field: (props: any) => any = props => {
  const { name, type, placeholder, block } = props
  return (
    <FormikField
      name={name}
      type={type}
      placeholder={placeholder}
      // prettier-ignore
      // because restProps should not have a trailing comma (fixed in prettier 1.9)
      render={({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...restProps
      }) => (
        <div>
          <Input
          {...field}
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
