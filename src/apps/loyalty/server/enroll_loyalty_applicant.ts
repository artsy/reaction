import fetch from "node-fetch"

export function fetchCollectorProfile(accessToken: string): any {
  return fetch(`${process.env.ARTSY_URL}/api/v1/me/collector_profile`, {
    headers: {
      "X-Access-Token": accessToken,
    },
  })
}

export function markCollectorAsLoyaltyApplicant(accessToken: string): any {
  return fetch(`${process.env.ARTSY_URL}/api/v1/me/collector_profile?loyalty_applicant=true`, {
    headers: {
      "X-Access-Token": accessToken,
    },
    method: "PUT",
  })
}
