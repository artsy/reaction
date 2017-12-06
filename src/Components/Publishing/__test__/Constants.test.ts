import { getMediaDate } from '../Constants'
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
