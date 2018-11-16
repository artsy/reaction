import { mount } from "enzyme"
import { cloneDeep } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { renderRelayTree } from "../../../DevTools"
import { ArtworkGridItem } from "../../Artwork/GridItem"
import { ArtworkGridFixture } from "../__stories__/ArtworkGridFixture"
import ArtworkGrid, {
  ArtworkGridContainer,
  ArtworkGridContainerState,
  columnBreakpointProps,
  createColumnBreakpoints,
} from "../ArtworkGrid"
import { ArtworkGridEmptyState } from "../ArtworkGridEmptyState"

jest.unmock("react-relay")
global.clearInterval = jest.fn()

const TestContainer = createFragmentContainer(
  (props: any) => {
    return <ArtworkGrid artworks={props.artist.artworks_connection} />
  },
  graphql`
    fragment ArtworkGrid_artist on Artist {
      artworks_connection(first: 4) {
        ...ArtworkGrid_artworks
      }
    }
  `
)

describe("ArtworkGrid", () => {
  describe("state", () => {
    it("maps column counts to breakpoint props", () => {
      expect(createColumnBreakpoints([1])).toEqual([
        [1, ["xs", "sm", "md", "lg", "xl"]],
      ])
      expect(createColumnBreakpoints([1, 2])).toEqual([
        [1, ["xs"]],
        [2, ["sm", "md", "lg", "xl"]],
      ])
      expect(createColumnBreakpoints([1, 2, 2, 3])).toEqual([
        [1, ["xs"]],
        [2, ["sm", "md"]],
        [3, ["lg", "xl"]],
      ])
      expect(createColumnBreakpoints([2, 2, 2, 3])).toEqual([
        [2, ["xs", "sm", "md"]],
        [3, ["lg", "xl"]],
      ])
    })

    it("maps breakpoints to props", () => {
      expect(columnBreakpointProps(createColumnBreakpoints([1]))).toEqual([
        { greaterThanOrEqual: "xs" },
      ])
      expect(
        columnBreakpointProps(createColumnBreakpoints([1, 2, 2, 3]))
      ).toEqual([
        { at: "xs" },
        { between: ["sm", "lg"] },
        { greaterThanOrEqual: "lg" },
      ])
    })
  })

  describe("when rendering", () => {
    const getRelayWrapper = async (artworks = ArtworkGridFixture) => {
      return await renderRelayTree({
        Component: TestContainer,
        query: graphql`
          query ArtworkGrid_Test_Query {
            artist(id: "pablo-picasso") {
              ...ArtworkGrid_artist
            }
          }
        `,
        mockResolvers: {
          Artist: () => ({ artworks_connection: artworks }),
          ArtworkConnection: () => artworks,
        },
      })
    }

    let props
    const getWrapper = passedProps => {
      return mount(<ArtworkGridContainer {...passedProps} useRelay={false} />)
    }

    beforeEach(() => {
      props = {
        artworks: ArtworkGridFixture,
      }
    })

    it("Renders artworks if present", async () => {
      const wrapper = await getRelayWrapper()
      expect(wrapper.text()).toMatch(ArtworkGridFixture.edges[0].node.title)
      expect(wrapper.find(ArtworkGridItem).length).toBe(4)
    })

    it("Renders empty message if no artworks", async () => {
      const emptyArtworks = cloneDeep(ArtworkGridFixture)
      emptyArtworks.edges = []
      const wrapper = await getRelayWrapper(emptyArtworks)
      expect(wrapper.find(ArtworkGridEmptyState).exists()).toBeTruthy()
    })

    it("Can call onClearFilters from empty message", () => {
      const emptyArtworks = cloneDeep(ArtworkGridFixture)
      emptyArtworks.edges = []
      props.artworks = emptyArtworks
      props.onClearFilters = jest.fn()
      const wrapper = getWrapper(props)
      wrapper.find("a").simulate("click")
      expect(props.onClearFilters).toBeCalled()
    })

    it("#componentDidMount sets state.interval if props.onLoadMore", () => {
      props.onLoadMore = jest.fn()
      const wrapper = getWrapper(props)
      const { interval } = wrapper.state() as ArtworkGridContainerState
      expect(interval).toBeGreaterThan(0)
    })

    it("#componentWillUnmount calls #clearInterval if state.interval exists", () => {
      props.onLoadMore = jest.fn()
      const wrapper = getWrapper(props)
      wrapper.instance().componentWillUnmount()
      expect(global.clearInterval).toBeCalled()
    })

    it("#maybeLoadMore calls props.onLoadMore if scroll position is at end", () => {
      props.onLoadMore = jest.fn()
      const wrapper = getWrapper(props).instance() as ArtworkGridContainer
      wrapper.maybeLoadMore()
      expect(props.onLoadMore).toBeCalled()
    })

    it("#sectionedArtworks divides artworks into columns", () => {
      const wrapper = getWrapper(props).instance() as ArtworkGridContainer
      const artworks = wrapper.sectionedArtworksForAllBreakpoints(
        props.artworks,
        [2, 2, 2, 3]
      )
      expect(artworks[0].length).toBe(2)
    })

    it("Renders artworks if present", () => {
      const wrapper = getWrapper(props)
      expect(wrapper.text()).toMatch(ArtworkGridFixture.edges[0].node.title)
      expect(wrapper.find(ArtworkGridItem).length).toBe(4)
    })
  })
})
