import fetch, { Response } from "node-fetch"
const { ARTSY_URL } = process.env

interface CollectorProfileReponse {
  loyalty_applicant_at: string,
  confirmed_buyer_at: string,
}

function gravity<T>(accessToken: string, path: string, method?: string): Promise<T> {
  const verb = method || "GET"
  return fetch(`${ARTSY_URL}/${path}`, {
    headers: {
      "X-Access-Token": accessToken,
    },
    method: verb,
  }).then(resp => resp.json<T>())
}

export function fetchCollectorProfile(accessToken: string): Promise<CollectorProfileReponse> {
  return gravity<CollectorProfileReponse>(accessToken, "api/v1/me/collector_profile")
}

export function markCollectorAsLoyaltyApplicant(accessToken: string): Promise<CollectorProfileReponse> {
  return gravity<CollectorProfileReponse>(accessToken, "api/v1/me/collector_profile?loyalty_applicant=true", "PUT")
}
