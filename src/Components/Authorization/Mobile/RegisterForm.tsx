import React from "react"
import { Step, Wizard } from "../../Wizard"

import {
  ChangeMode,
  GrayFacebookButton,
  TOSCheckbox,
} from "../commonElements"
<<<<<<< HEAD
import { FormComponentType } from "../Types"
=======
import Input from "../../Input"
import { Validators } from "../Validators"
import { FormComponentType, InputValues } from "../Types"
>>>>>>> Sign up form

export const MobileRegisterForm: FormComponentType = props => {
  const steps = [
    <Step>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur },
      }) => (
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
      )}
    </Step>,
    <Step>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur },
      }) => (
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
      )}
    </Step>,
    <Step>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur },
      }) => (
        <div>
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
              touched.acceptedTermsOfService && errors.acceptedTermsOfService
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
        </div>
      )}
    </Step>,
  ]
  return (
    <Wizard steps={steps}>
      {context => {
        const { wizard } = context
        const { currentStep } = wizard
        return (
          <div>
            {currentStep}
            <GrayFacebookButton>Sign up with Facebook</GrayFacebookButton>
            <p>
              Already have an account?
              <ChangeMode handleClick={() => null}>Log In</ChangeMode>
            </p>
          </div>
        )
      }}
    </Wizard>
  )
}
