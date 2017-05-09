import fetch from "node-fetch"
const { API_URL } = process.env

function gravity<T>(accessToken: string, path: string, method?: string): Promise<T> {
  const verb = method || "GET"
  return fetch(`${API_URL}/${path}`, {
    headers: {
      "X-Access-Token": accessToken,
    },
    method: verb,
  }).then(resp => resp.json<T>())
}

export function fetchCollectorProfile(accessToken: string): Promise<CollectorProfile> {
  return gravity<CollectorProfile>(accessToken, "api/v1/me/collector_profile")
}

export function markCollectorAsLoyaltyApplicant(accessToken: string): Promise<CollectorProfile> {
  return gravity<CollectorProfile>(accessToken, "api/v1/me/collector_profile?loyalty_applicant=true", "PUT")
}
