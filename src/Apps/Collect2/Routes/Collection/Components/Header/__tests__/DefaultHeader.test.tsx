import { defaultCollectionHeaderArtworks } from "Apps/Collect2/Routes/Collection/Components/Header/__tests__/fixtures/artworks"
import {
  CollectionDefaultHeader,
  getHeaderArtworks,
} from "Apps/Collect2/Routes/Collection/Components/Header/DefaultHeader"
import { useTracking } from "Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"

jest.mock("Artsy/Analytics/useTracking")

describe("default collections header artworks", () => {
  const hasDuplicateArtworks = (artworksRendered, allArtworks) => {
    return artworksRendered.length !== allArtworks.length
  }

  it("duplicates header artworks when the quantity of artworks in collection are small in a large viewport", () => {
    const artworks = defaultCollectionHeaderArtworks.hits.slice(0, 3)
    const headerArtworks = getHeaderArtworks(artworks, 1275, false)

    expect(hasDuplicateArtworks(headerArtworks, artworks)).toBeTruthy()
    expect(headerArtworks.length).toBeGreaterThan(artworks.length)
    expect(headerArtworks).toHaveLength(7)
  })

  it("duplicates header artworks when the quantity of artworks in collection are small in a small viewport", () => {
    const artworks = defaultCollectionHeaderArtworks.hits.slice(0, 2)
    const headerArtworks = getHeaderArtworks(artworks, 375, true)

    expect(hasDuplicateArtworks(headerArtworks, artworks)).toBeTruthy()
    expect(headerArtworks.length).toBeGreaterThan(artworks.length)
    expect(headerArtworks).toHaveLength(4)
  })

  it("returns only the number of artworks necessary to fill the header", () => {
    const artworks = defaultCollectionHeaderArtworks.hits
    const headerArtworks = getHeaderArtworks(artworks, 675, false)

    expect(headerArtworks.length).toBeLessThan(artworks.length)
    expect(headerArtworks).toHaveLength(4)
  })
})

describe("default header component", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      headerArtworks: defaultCollectionHeaderArtworks,
      defaultHeaderImageHeight: 1000,
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = headerProps => {
    return mount(<CollectionDefaultHeader {...headerProps} />)
  }

  it("renders a snapshot", () => {
    const component = renderer
      .create(
        <CollectionDefaultHeader
          headerArtworks={props.headerArtworks}
          defaultHeaderImageHeight={props.defaultHeaderImageHeight}
          collection_id={props.collection_id}
          collection_slug={props.collection_slug}
        />
      )
      .toJSON()

    expect(component).toMatchSnapshot()
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

  // @TODO: Investigate why this mock window declaration isn't being respected here
  xit("when viewport size is large the image src link references the large resized url", () => {
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

  describe("Tracking", () => {
    it("Tracks collection click", () => {
      const component = mount(<CollectionDefaultHeader {...props} />)

      component
        .find("a")
        .at(0)
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_page: "Collection",
        context_module: "ArtworkBanner",
        context_page_owner_type: "Collection",
        destination_path:
          "/artwork/carrie-mae-weems-untitled-woman-and-daughter-with-children",
        context_page_owner_id: undefined,
        context_page_owner_slug: undefined,
      })
    })
  })
})
