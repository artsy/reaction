import { formatTime, getMediaDate } from "../Constants"
import { VideoArticle } from "../Fixtures/Articles"

describe("getMediaDate", () => {
  let article

  beforeEach(() => {
    article = VideoArticle
  })

  it("returns media release date if date", () => {
    const date = getMediaDate(article)
    expect(date).toBe(article.media.release_date)
  })

  it("returns published_at date if no release_date", () => {
    delete article.media.release_date
    const date = getMediaDate(article)
    expect(date).toBe(article.published_at)
  })
})

describe("#formatTime", () => {
  it("#formatTime - formats single digit seconds and minutes", () => {
    expect(formatTime(0)).toMatch("00:00")
  })

  it("#formatTime - formats double digit seconds and minutes", () => {
    expect(formatTime(5601)).toMatch("33:21")
    expect(formatTime(1000)).toMatch("16:40")
  })

  it("#formatTime - formats single digit seconds and minutes", () => {
    expect(formatTime(301)).toMatch("05:01")
    expect(formatTime(242)).toMatch("04:02")
  })
})
