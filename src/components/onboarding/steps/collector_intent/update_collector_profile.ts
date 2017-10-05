export default function updateCollectorProfile(user, { intents }) {
  const options: RequestInit = {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-Access-Token": user.accessToken,
    },
    body: JSON.stringify({
      intents,
    }),
  }

  return new Promise((resolve, reject) => {
    fetch(`https://api.artsy.net/api/v1/collector_profile/${user.id}`, options)
      .then(res => {
        if (res.status >= 500) {
          reject(new Error(`Failed with status ${res.status}`))
        } else if (res.status === 200) {
          resolve(res.body)
        } else {
          reject(new Error(`Failed`))
        }
      })
      .catch(err => {
        if (process.env.NODE_ENV !== "test") {
          console.error(err)
        }
        reject(err)
      })
  })
}
