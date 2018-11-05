import { crop, resize } from "../resizer"

describe("resizer", () => {
  describe("#crop", () => {
    it("uses width, height, and quality", () => {
      const url = crop("https://media.artsy.net/img.jpg", {
        width: 100,
        height: 100,
        quality: 80,
      })
      expect(url).toMatch("d7hftxdivxxvm")
      expect(url).toMatch("&width=100&height=100&quality=80")
    })

    it("uses display url when passed as an option", () => {
      const url = crop("https://media.artsy.net/img.jpg", {
        width: 100,
        height: 100,
        isDisplayAd: true,
      })
      expect(url).toMatch("de5y2r7wr8mpb")
      expect(url).toMatch("&width=100&height=100&quality=95")
    })
  })

  describe("#resize", () => {
    it("resizes to a width", () => {
      const url = resize("https://media.artsy.net/img.jpg", {
        width: 100,
      })
      expect(url).toMatch("d7hftxdivxxvm")
      expect(url).toMatch("&width=100&quality=80")
      expect(url).toMatch("resize_to=width")
    })

    it("resizes to a height", () => {
      const url = resize("https://media.artsy.net/img.jpg", {
        height: 100,
      })
      expect(url).toMatch("d7hftxdivxxvm")
      expect(url).toMatch("&height=100&quality=80")
      expect(url).toMatch("resize_to=height")
    })

    it("uses display url when passed as an option", () => {
      const url = resize("https://media.artsy.net/img.jpg", {
        width: 100,
        isDisplayAd: true,
      })
      expect(url).toMatch("de5y2r7wr8mpb")
      expect(url).toMatch("&width=100&quality=80")
    })
  })
})
