import {
  artworks,
  artworksArrayLarge,
  artworksArraySmall,
} from "Apps/Collect/Components/Collection/Header/__tests__/fixtures/artworks"
import {
  CollectionDefaultHeader,
  getHeaderArtworks,
} from "Apps/Collect/Components/Collection/Header/DefaultHeader"
import { shallow } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"

describe("artworks", () => {
  it("returns an array of repeating artworks when original array of works is too small to fill header ", () => {
    const result = getHeaderArtworks(artworksArraySmall, 1308, false)

    expect(result).toHaveLength(9)
  })

  it("returns the same number of artworks originally passed when header can fit all works ", () => {
    const result = getHeaderArtworks(artworksArrayLarge, 1308, false)

    expect(result).toHaveLength(12)
  })
})

describe("default header component", () => {
  let props

  beforeEach(() => {
    props = {
      headerArtworks: artworks,
      defaultHeaderImageHeight: 1000,
    }
  })

  const getWrapper = headerProps => {
    return shallow(<CollectionDefaultHeader {...headerProps} />)
  }

  it("renders a snapshot", () => {
    const component = renderer
      .create(
        <CollectionDefaultHeader
          headerArtworks={props.headerArtworks}
          defaultHeaderImageHeight={props.defaultHeaderImageHeight}
        />
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it("renders images in the header component ", () => {
    const header = getWrapper(props)

    expect(header.find("Image").length).toBe(6)
  })

  // TODO: Debug this failing test
  xit("handles a click on an artwork image in the header ", () => {
    const header = getWrapper(props)
    window.open = jest.fn()

    header
      .find("Image")
      .at(0)
      .simulate("click")

    expect(window.open).toHaveBeenCalledWith(
      "/artwork/shepard-fairey-50-shades-of-black-lp-box-set",
      "_blank"
    )
  })
})
