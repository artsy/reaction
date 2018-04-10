import { Formik, FormikProps } from "formik"
import React from "react"
import Yup from "yup"
import Wizard from "./Wizard"
import { Step } from "./Step"

import {
  ChangeMode,
  FormContainer,
  inputValidators,
  StyledFacebookButton,
  StyledInput as Input,
  TOSCheckbox,
} from "../commonElements"
import { FormComponentType, InputValues } from "../Types"

// interface StepProps {
//   onNextButtonPressed: () => void
// }

export const MobileRegisterForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={Yup.object().shape(inputValidators)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }: FormikProps<InputValues>) => {
        return (
          <FormContainer onSubmit={handleSubmit}>
            <Wizard>
              {handleValidation => {
                return (
                  <div>
                    <Step onValidation={handleValidation}>
                      <Input
                        type="email"
                        block
                        error={touched.email && errors.email}
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Input
                        type="email"
                        block
                        error={touched.email && errors.email}
                        name="email2"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Step>
                    <Step onValidation={handleValidation}>
                      <Input
                        block
                        error={touched.password && errors.password}
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Step>
                    <Step onValidation={handleValidation}>
                      <Input
                        block
                        error={touched.name && errors.name}
                        name="name"
                        placeholder="Name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TOSCheckbox
                        error={
                          touched.acceptedTermsOfService &&
                          errors.acceptedTermsOfService
                        }
                        value={values.acceptedTermsOfService}
                        type="checkbox"
                        name="accepted-terms-of-service"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorMessage={errors.acceptedTermsOfService}
                      >
                        I Agree to the TOS And PP
                      </TOSCheckbox>
                    </Step>
                  </div>
                )
              }}
            </Wizard>

            <StyledFacebookButton>Sign up with Facebook</StyledFacebookButton>
            <p>
              Already have an account?
              <ChangeMode handleClick={props.handleChangeMode("login")}>
                Log In
              </ChangeMode>
            </p>
          </FormContainer>
        )
      }}
    </Formik>
  )
}
