import { defaultCollectionHeaderArtworks } from "Apps/Collect2/Components/Collection/Header/__tests__/fixtures/artworks"
import {
  CollectionDefaultHeader,
  getHeaderArtworks,
} from "Apps/Collect2/Components/Collection/Header/DefaultHeader"
import { shallow } from "enzyme"
import { uniq } from "lodash"
import React from "react"
import renderer from "react-test-renderer"

describe("artworks", () => {
  const hasDuplicateArtworks = headerArtworks => {
    return uniq(headerArtworks).length !== headerArtworks.length
  }

  it("returns a list of duplicating artworks that will fill the header, when the quantity of artworks in collection are small in a large viewport", () => {
    const artworks = defaultCollectionHeaderArtworks.hits.slice(0, 3)
    const headerArtworks = getHeaderArtworks(artworks, 1275, false)

    expect(hasDuplicateArtworks(headerArtworks)).toBeTruthy()
    expect(headerArtworks.length).toBeGreaterThan(artworks.length)
    expect(headerArtworks).toHaveLength(6)
  })

  it("returns a list of duplicating artworks that will fill the header, when the quantity of artworks in collection are small in a small viewport", () => {
    const artworks = defaultCollectionHeaderArtworks.hits.slice(0, 2)
    const headerArtworks = getHeaderArtworks(artworks, 375, true)

    expect(hasDuplicateArtworks(headerArtworks)).toBeTruthy()
    expect(headerArtworks.length).toBeGreaterThanOrEqual(artworks.length)
    expect(headerArtworks).toHaveLength(4)
  })

  it("returns only the number of artworks necessary to fill the header", () => {
    const artworks = defaultCollectionHeaderArtworks.hits

    const headerArtworks = getHeaderArtworks(artworks, 1375, false)
    expect(artworks.length).toBeGreaterThanOrEqual(headerArtworks.length)
    expect(headerArtworks).toHaveLength(10)
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

  it("when viewport size is small the image src link references the small resized url", () => {
    const mockWindow: any = window
    mockWindow.innerWidth = 375
    mockWindow.innerHeight = 375
    const wrapper = getWrapper(props)
    const headerArtwork = wrapper.find("Image").first()

    expect(headerArtwork.props().src).toEqual(
      "https://resized-small.cloudfront.net"
    )
  })

  it("when viewport size is large the image src link references the large resized url", () => {
    const mockWindow: any = window
    mockWindow.innerWidth = 900
    mockWindow.innerHeight = 900
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
    ).toEqual(
      "/artwork/carrie-mae-weems-untitled-woman-and-daughter-with-children"
    )
  })
})
