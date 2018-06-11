import * as sharify from "sharify"
import { metaphysics } from "Utils/metaphysics"

export const handleSubmit = (
  url: string,
  csrf: string,
  redirectUrl?: string
) => async (values, formikBag) => {
  try {
    const data = await sendAuthData(url, { _csrf: csrf, ...values })
    if (data.success) {
      if (redirectUrl) {
        document.location.pathname = redirectUrl
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

const query = email => `
  query {
    user(email: "${email}") {
      userAlreadyExists
    }
  }
`

export const checkEmailExists = (values, actions) => {
  return metaphysics(
    { query: query(values.email) },
    {
      appToken: sharify.data.XAPP_TOKEN,
    }
  ).then(({ data }: any) => {
    if (data.user.userAlreadyExists) {
      actions.setFieldError("email", "Email already exists.")
      actions.setSubmitting(false)
      return false
    }
    return true
  })
}

export const checkEmailDoesNotExist = (values, actions) => {
  return metaphysics(
    { query: query(values.email) },
    {
      appToken: sharify.data.XAPP_TOKEN,
    }
  ).then(({ data }: any) => {
    if (data.user.userAlreadyExists) {
      return true
    }
    actions.setFieldError("email", "Email does not exist.")
    actions.setSubmitting(false)
    return false
  })
}
