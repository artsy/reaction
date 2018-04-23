import React from "react"
import { Field as FormikField } from "formik"
import styled from "styled-components"
import { default as Input, InputProps } from "../../Input"

export interface FormikInputProps extends InputProps {}

/**
 * An input wrapped in a Formik Field for rendering convenience.
 */
export const Field: React.SFC<FormikInputProps> = props => {
  const { name, type, placeholder, block, autoFocus } = props
  return (
    <FormikField
      name={name}
      type={type}
      placeholder={placeholder}
      render={({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values }, // also setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...restProps
      }) => (
        <div>
          <Input
            {...field}
            autoFocus={autoFocus}
            block={block}
            type={type}
            placeholder={placeholder}
            error={touched[name] && errors[name]}
            value={values[name]}
            {...restProps}
          />
          {touched[name] &&
            errors[name] && <InputError>{errors[name]}</InputError>}
        </div>
      )}
    />
  )
}

const InputError = styled.div`
  color: red;
`
