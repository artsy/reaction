import { ArtworkGrid_artworks } from "__generated__/ArtworkGrid_artworks.graphql"
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
  createSectionedArtworks,
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

    describe("concerning column layout", () => {
      const aspectRatios = [
        1.23,
        0.74,
        0.75,
        1.06,
        0.73,
        1.28,
        0.77,
        1.37,
        1.37,
        0.75,
        0.74,
        0.73,
        0.78,
        0.71,
        0.75,
        1.34,
        1.2,
        0.71,
        1.27,
        0.73,
        0.75,
        0.8,
        0.8,
        1.36,
      ]

      const artworks = {
        " $refType": null,
        edges: aspectRatios.reduce(
          (acc, aspect_ratio) => [
            ...acc,
            { node: { image: { aspect_ratio } } },
          ],
          []
        ),
      } as ArtworkGrid_artworks

      function expected(columnsRatios: number[][]) {
        return columnsRatios.map(columnRatios =>
          columnRatios.map(aspect_ratio => ({ image: { aspect_ratio } }))
        )
      }

      it("tries to lay out artworks in columns such that they are similar in height, based on aspect ratio", () => {
        expect(createSectionedArtworks(artworks, 3)).toEqual(
          expected([
            [1.23, 1.06, 0.77, 0.74, 0.71, 1.2, 0.73, 0.8],
            [0.74, 1.28, 1.37, 0.75, 0.78, 1.34, 1.27, 0.75, 1.36],
            [0.75, 0.73, 1.37, 0.73, 0.75, 0.71, 0.8],
          ])
        )
        expect(createSectionedArtworks(artworks, 4)).toEqual(
          expected([
            [1.23, 0.73, 0.74, 0.75, 0.75],
            [0.74, 1.37, 0.75, 0.71, 0.73, 1.36],
            [0.75, 0.77, 0.78, 1.2, 1.27, 0.8],
            [1.06, 1.28, 1.37, 0.73, 1.34, 0.71, 0.8],
          ])
        )
      })
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
