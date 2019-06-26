import { data as sd } from "sharify"

export const targetingData = (id: string, pageType: string) => {
  const isTesting = JSON.parse(sd.HASHTAG_LAB_ADS_ENABLED || "true")
  return {
    is_testing: isTesting,
    page_type: pageType,
    post_id: id,
  }
}

export const is300x50AdUnit = (unit: string): boolean => {
  return unit.slice(-3) === "x50"
}
