import { data as sd } from "sharify"

export const createCollectUrl = (
  minCents,
  maxCents,
  category,
  widthCm,
  heightCm,
  artistId
) => {
  const categoryHref = "/collect/" + category.toLowerCase()
  const acquirableHref =
    "?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true"

  // const heightCm = dimensions.cm.split(" × ")[0]
  // const widthCm = dimensions.cm.split(" × ")[1].replace(" cm", "")

  // const area = parseFloat(heightCm) * parseFloat(widthCm)

  const area = heightCm * widthCm

  let min
  let max

  if (area < 70 * 70) {
    min = Math.round(40 / 2.54)
    max = Math.round(70 / 2.54)
  } else if (area < 40 * 40) {
    min = 0
    max = Math.round(40 / 2.54)
  } else {
    min = Math.round(70 / 2.54)
    max = "*"
  }

  const sizeHref = "&height=" + min + "-" + max + "&width=" + min + "-" + max

  const minDollars = Math.round(minCents / 100)
  const maxDollars = Math.round(maxCents / 100)
  const priceRangeHref = "&price_range=" + minDollars + "-" + maxDollars
  const artistHref = "&artist_id=" + artistId
  const url =
    sd.APP_URL +
    categoryHref +
    acquirableHref +
    priceRangeHref +
    sizeHref +
    artistHref

  return url
}
