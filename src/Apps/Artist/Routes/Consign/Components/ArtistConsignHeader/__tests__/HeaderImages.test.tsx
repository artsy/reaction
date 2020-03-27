import { mount } from "enzyme"
import React from "react"
import { getRandomImages, HeaderImages } from "../HeaderImages"

describe("HeaderImages", () => {
  describe("getRandomImages", () => {
    it("errors out if no suitable image dimensions / combinations found", () => {
      const images: any = [
        {
          image: {
            resized: {
              width: 100,
              height: 10,
            },
          },
        },
        {
          image: {
            resized: {
              width: 100,
              height: 10,
            },
          },
        },
        // This image is suitable dimension-wise, but we need two images
        {
          image: {
            resized: {
              width: 100,
              height: 1000,
            },
          },
        },
      ]

      const { error } = getRandomImages(images)
      expect(error).toEqual(true)
    })

    it("errors out if no images found", () => {
      const images: any = []
      const { error } = getRandomImages(images)
      expect(error).toEqual(true)
    })

    it("returns two images", () => {
      const images: any = [
        {
          image: {
            resized: {
              width: 100,
              height: 100,
              url: "success",
            },
          },
        },
        {
          image: {
            resized: {
              width: 100,
              height: 100,
              url: "success",
            },
          },
        },
        {
          image: {
            resized: {
              width: 100,
              height: 100,
              url: "success",
            },
          },
        },
      ]

      const { error, leftImage, rightImage } = getRandomImages(images)
      expect(error).toBeUndefined()
      expect(leftImage.image.resized.url).toEqual("success")
      expect(rightImage.image.resized.url).toEqual("success")
    })
  })

  describe("HeaderImages component", () => {
    it("does not render images if suitable images not found", () => {
      const images: any = [
        {
          image: {
            resized: {
              width: 1000,
              height: 100,
              url: "success",
            },
          },
        },
        {
          image: {
            resized: {
              width: 1000,
              height: 100,
              url: "success",
            },
          },
        },
      ]

      const wrapper = mount(<HeaderImages artworksByInternalID={images} />)
      expect(wrapper.find("ResponsiveImage").length).toEqual(0)
    })

    it("renders images if found", () => {
      const images: any = [
        {
          image: {
            resized: {
              width: 100,
              height: 100,
              url: "success",
            },
          },
        },
        {
          image: {
            resized: {
              width: 100,
              height: 100,
              url: "success",
            },
          },
        },
      ]

      const wrapper = mount(<HeaderImages artworksByInternalID={images} />)
      expect(wrapper.find("ResponsiveImage").length).toEqual(4) // actually two images, but we set image as border
    })
  })
})
