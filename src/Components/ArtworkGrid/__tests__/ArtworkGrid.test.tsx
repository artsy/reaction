import { mount } from "enzyme"
import { cloneDeep } from "lodash"
import React from "react"
import { ArtworkGridItem } from "../../Artwork/GridItem"
import {
  ArtworkGridContainer as ArtworkGrid,
  ArtworkGridContainerState,
} from "../ArtworkGrid"
import { ArtworkGridEmptyState } from "../ArtworkGridEmptyState"
import { ArtworkGridFixture } from "./ArtworkGridFixture"

global.clearInterval = jest.fn()

describe("ArtworkGrid", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<ArtworkGrid {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      artworks: ArtworkGridFixture,
    }
  })

  it("#componentDidMount sets state.interval if props.onLoadMore", () => {
    props.onLoadMore = jest.fn()
    const wrapper = getWrapper()
    const { interval } = wrapper.state() as ArtworkGridContainerState
    expect(interval).toBe(4)
  })

  it("#componentWillUnmount calls #clearInterval if state.interval exists", () => {
    props.onLoadMore = jest.fn()
    const wrapper = getWrapper()
    wrapper.instance().componentWillUnmount()
    expect(global.clearInterval).toBeCalled()
  })

  it("#maybeLoadMore calls props.onLoadMore if scroll position is at end", () => {
    props.onLoadMore = jest.fn()
    const wrapper = getWrapper().instance() as ArtworkGrid
    wrapper.maybeLoadMore()
    expect(props.onLoadMore).toBeCalled()
  })

  it("#sectionedArtworks divides artworks into columns", () => {
    props.columnCount = 2
    const wrapper = getWrapper().instance() as ArtworkGrid
    const artworks = wrapper.sectionedArtworks()
    expect(artworks.length).toBe(props.columnCount)
  })

  it("Renders artworks if present", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toMatch(ArtworkGridFixture.edges[0].node.title)
    expect(wrapper.find(ArtworkGridItem).length).toBe(4)
  })

  describe("With empty artworks", () => {
    beforeEach(() => {
      const emptyData = cloneDeep(ArtworkGridFixture)
      emptyData.edges = []
      props.artworks = emptyData
    })

    it("Renders empty state if no artworks", () => {
      const wrapper = getWrapper(props)
      expect(wrapper.find(ArtworkGridEmptyState).exists()).toBeTruthy()
    })

    it("Can call onClearFilters from empty state", () => {
      props.onClearFilters = jest.fn()
      const wrapper = getWrapper(props)
      wrapper.find("a").simulate("click")
      expect(props.onClearFilters).toBeCalled()
    })
  })
})
