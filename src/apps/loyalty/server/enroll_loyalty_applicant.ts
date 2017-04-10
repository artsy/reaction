import * as request from "request"

interface CollectorProfileData {
  loyalty_applicant_at: string
  confirmed_buyer_at: string
}

export function fetchCollectorProfile(accessToken: string): Promise<CollectorProfileData> {
  return new Promise((resolve, reject) => {
    request({
      url: `${process.env.ARTSY_URL}/api/v1/me/collector_profile`,
      headers: {
        "X-Access-Token": accessToken,
      },
    }, (err, resp, body) => {

      if (!err && resp.statusCode === 200) {
        const info = JSON.parse(body)
        return resolve(info)
      } else {
        return reject
      }
    })
  },
)}

export function markCollector(accessToken: string): Promise<CollectorProfileData> {
  return new Promise((resolve, reject) => {
    request({
      url: `${process.env.ARTSY_URL}/api/v1/me/collector_profile`,
      headers: {
        "X-Access-Token": accessToken,
      },
      method: "PUT",
      body: JSON.stringify({ loyalty_applicant: true }),
    }, (err, resp, body) => {

      if (!err && resp.statusCode === 200) {
        const info = JSON.parse(body)
        return resolve(info)
      } else {
        return reject
      }
    })
  },
)}
