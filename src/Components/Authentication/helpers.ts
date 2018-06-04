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
