import { defaultCollectionHeaderArtworks } from "Apps/Collect/Components/Collection/Header/__tests__/fixtures/artworks"
import {
  CollectionDefaultHeader,
  getHeaderArtworks,
} from "Apps/Collect/Components/Collection/Header/DefaultHeader"
import { shallow } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"

describe("artworks", () => {
  it("returns an array of repeating artworks when original array of works is too small to fill header ", () => {
    const artworks = defaultCollectionHeaderArtworks.hits.slice(0, 3)
    const result = getHeaderArtworks(artworks, 1308, false)

    expect(result.length).toBeGreaterThan(artworks.length)
    expect(result).toHaveLength(6)
  })

  it("returns an array of artworks of equal length as the original array received when header can fit all works ", () => {
    const artworks = defaultCollectionHeaderArtworks.hits

    const result = getHeaderArtworks(artworks, 1308, false)
    expect(artworks.length).toEqual(result.length)
    expect(result).toHaveLength(10)
  })
})

describe("default header component", () => {
  let props

  beforeEach(() => {
    props = {
      headerArtworks: defaultCollectionHeaderArtworks,
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
    const wrapper = getWrapper(props)

    expect(wrapper.find("Image").length).toBe(10)
  })

  it("when viewport size is sm or small the image src link references the small resized url", () => {
    const mockWindow: any = window
    mockWindow.innerWidth = 600
    mockWindow.innerHeight = 600
    const wrapper = getWrapper(props)
    const headerArtwork = wrapper.find("Image").first()

    expect(headerArtwork.props().src).toEqual(
      "https://resized-small.cloudfront.net"
    )
  })

  it("when viewport size is md or larger the image src link references the large resized url", () => {
    const mockWindow: any = window
    mockWindow.innerWidth = 1200
    mockWindow.innerHeight = 1200
    const wrapper = getWrapper(props)
    const headerArtwork = wrapper.find("Image").first()

    expect(headerArtwork.props().src).toEqual(
      "https://resized-large.cloudfront.net"
    )
  })

  it("a header image's anchor tag references the correct artwork slug ", () => {
    const wrapper = getWrapper(props)

    expect(
      wrapper
        .find("a")
        .at(0)
        .props().href
    ).toEqual("/artwork/shepard-fairey-50-shades-of-black-lp-box-set")
  })
})
