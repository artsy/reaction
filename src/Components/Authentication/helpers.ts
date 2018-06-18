import * as sharify from "sharify"
import { metaphysics } from "Utils/metaphysics"

export const handleSubmit = (
  url: string,
  csrf: string,
  redirectTo?: string
) => async (values, formikBag) => {
  try {
    const data = await sendAuthData(url, { _csrf: csrf, ...values })
    if (data.success) {
      if (redirectTo) {
        document.location.pathname = redirectTo
      }
    } else {
      formikBag.setStatus(data)
    }
  } catch (err) {
    formikBag.setStatus(err)
  }
}

export async function sendAuthData(
  url: string,
  values: { [key: string]: any; _csrf: string }
) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify(values),
  })
  const data = await res.json()
  return data
}

export const checkEmail = ({ values, actions, shouldExist }) => {
  const query = email => `
    query {
      user(email: "${email}") {
        userAlreadyExists
      }
    }
  `
  return metaphysics(
    { query: query(values.email) },
    {
      appToken: sharify.data.XAPP_TOKEN,
    }
  ).then(({ data }: any) => {
    if (data.user.userAlreadyExists) {
      if (shouldExist) {
        return true
      } else {
        actions.setFieldError("email", "Email already exists.")
        actions.setSubmitting(false)
        return false
      }
    } else {
      if (shouldExist) {
        actions.setFieldError("email", "Email does not exist.")
        actions.setSubmitting(false)
        return false
      } else {
        return true
      }
    }
  })
}
