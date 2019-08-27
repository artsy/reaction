import { ArticleData } from "Components/Publishing/Typings"
import { data as sd } from "sharify"
import { get } from "Utils/get"

export const targetingData = (
  id: string,
  pageType: string,
  verticalTag: string
) => {
  const isTesting = sd.DEPLOY_ENV === "production" ? false : true

  return {
    tags: verticalTag,
    is_testing: isTesting,
    page_type: pageType,
    post_id: id,
  }
}

export const is300x50AdUnit = (unit: string): boolean => {
  return unit.slice(-3) === "x50"
}

export const getVerticalTag = (article: ArticleData) => {
  return get(article, a => a.vertical.name, "")
}
