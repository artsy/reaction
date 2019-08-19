import { mount } from "enzyme"
import React from "react"

import { EditorialFeaturesProps } from "Components/Publishing/EditorialFeature/EditorialFeature"
import { Vanguard2019Fixture } from "Components/Publishing/EditorialFeature/Fixtures/Vanguard2019"
import { Nav } from "Components/Publishing/Nav/Nav"
import { ArticleData } from "Components/Publishing/Typings"
import { VanguardArtistWrapper } from "../Components/ArtistWrapper"
import { VanguardIntroduction } from "../Components/Introduction"
import { VanguardSeriesWrapper } from "../Components/SeriesWrapper"
import {
  SeriesContainer as TocSeriesContainer,
  VanguardTableOfContents,
} from "../Components/TableOfContents"
import { Vanguard2019 } from "../index"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("Vanguard2019", () => {
  let props: EditorialFeaturesProps
  const getWrapper = (passedProps = props) => {
    return mount(<Vanguard2019 {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: Vanguard2019Fixture as ArticleData,
    }
  })

  describe("Rendering", () => {
    it("Renders nav", () => {
      const component = getWrapper()
      expect(component.find(Nav).length).toBe(1)
    })

    it("Renders Introduction", () => {
      const component = getWrapper()
      expect(component.find(VanguardIntroduction).length).toBe(1)
    })

    it("Renders TableOfContents", () => {
      const component = getWrapper()
      expect(component.find(VanguardTableOfContents).length).toBe(1)
    })

    it("Renders series articles", () => {
      const component = getWrapper()
      expect(component.find(VanguardSeriesWrapper).length).toBe(3)
    })

    it("Renders artist articles", () => {
      const component = getWrapper()
      expect(component.find(VanguardArtistWrapper).length).toBe(3)
    })
  })

  it("#componentDidMount sets valid slugs and adds scroll listener", () => {
    window.addEventListener = jest.fn()
    const instance = getWrapper().instance() as Vanguard2019
    instance.getValidPaths = jest.fn()
    instance.onChangeSection = jest.fn()
    instance.componentDidMount()

    expect(instance.getValidPaths).toBeCalled()
    expect(window.addEventListener).toBeCalled()
    // FIXME: unable to get equality on bound listener value
  })

  it("#componentWillUnmount removes scroll listener", () => {
    window.removeEventListener = jest.fn()
    const instance = getWrapper().instance() as Vanguard2019
    instance.componentWillUnmount()

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "load",
      instance.handleScrollOnLoad
    )
  })

  describe("#handleScrollOnLoad", () => {
    it("Changes sections and replaces location if valid slug", () => {
      window.history.pushState({}, "", "/series/artsy-vanguard-2019/emerging")
      window.history.replaceState = jest.fn()
      const instance = getWrapper().instance() as Vanguard2019
      instance.onChangeSection = jest.fn()
      instance.handleScrollOnLoad()

      expect(instance.onChangeSection).toBeCalledWith("emerging")
      expect(window.history.replaceState).toBeCalledWith(
        {},
        "",
        "/series/artsy-vanguard-2019"
      )
    })

    it("Removes invalid slug if present", () => {
      window.history.pushState({}, "", "/series/artsy-vanguard-2019/foo")
      window.history.replaceState = jest.fn()
      const instance = getWrapper().instance() as Vanguard2019
      instance.onChangeSection = jest.fn()
      instance.handleScrollOnLoad()

      expect(instance.onChangeSection).not.toBeCalled()
      expect(window.history.replaceState).toBeCalledWith(
        {},
        "",
        "/series/artsy-vanguard-2019"
      )
    })
  })

  it("#getValidPaths creates an array of valid slugs", () => {
    const instance = getWrapper().instance() as Vanguard2019
    expect(instance.validSlugs).toEqual([
      "emerging",
      "genesis-balenger",
      "newly-established",
      "frank-bowling",
      "getting-their-due",
      "diane-simpson",
    ])
  })

  it("#onChangeSection scrolls to section", () => {
    const scrollIntoView = jest.fn()
    const getElementById = jest.fn().mockReturnValue({
      scrollIntoView,
    })
    document.getElementById = getElementById
    const component = getWrapper()
    component
      .find(TocSeriesContainer)
      .at(0)
      .simulate("click")
    expect(getElementById).toBeCalledWith("emerging")
    expect(scrollIntoView).toBeCalled()
  })
})
