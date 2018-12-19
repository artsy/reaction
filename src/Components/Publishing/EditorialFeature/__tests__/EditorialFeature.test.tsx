import { Eoy2018Artists as Eoy2018ArtistsFixture } from "Components/Publishing/EditorialFeature/Fixtures/Eoy2018Artists"
import { Eoy2018Culture as Eoy2018CultureFixture } from "Components/Publishing/EditorialFeature/Fixtures/Eoy2018Culture"
import { FeatureArticle } from "Components/Publishing/Fixtures/Articles"
import {
  ArticleProps,
  FeatureLayout,
} from "Components/Publishing/Layouts/FeatureLayout"
import { ArticleData } from "Components/Publishing/Typings"
import { mount } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"
import { Eoy2018Artists } from "../Components/Eoy2018Artists"
import { Eoy2018Culture } from "../Components/Eoy2018Culture"
import { EditorialFeature } from "../EditorialFeature"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("EditorialFeature", () => {
  let props: ArticleProps
  const getWrapper = (passedProps = props) => {
    return mount(<EditorialFeature {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: FeatureArticle,
    }
  })

  it("Renders template for feature layout by default", () => {
    props.customEditorial = "COOL_ARTICLE"
    const component = getWrapper(props)
    expect(component.find(FeatureLayout)).toBeTruthy()
  })

  describe("EOY_2018_ARTISTS", () => {
    beforeEach(() => {
      props = {
        article: Eoy2018ArtistsFixture as ArticleData,
        customEditorial: "EOY_2018_ARTISTS",
      }
    })

    it("Renders template for EOY_2018_ARTISTS article", () => {
      const component = getWrapper(props)
      expect(component.find(Eoy2018Artists)).toBeTruthy()
    })

    it("Matches snapshot", () => {
      const component = renderer.create(<EditorialFeature {...props} />)
      expect(component).toMatchSnapshot()
    })
  })

  describe("EOY_2018_CULTURE", () => {
    beforeEach(() => {
      props = {
        article: Eoy2018CultureFixture as ArticleData,
        customEditorial: "EOY_2018_CULTURE",
      }
    })

    it("Renders template for EOY_2018_CULTURE article", () => {
      const component = getWrapper(props)
      expect(component.find(Eoy2018Culture)).toBeTruthy()
    })

    it("Matches snapshot", () => {
      const component = renderer.create(<EditorialFeature {...props} />)
      expect(component).toMatchSnapshot()
    })
  })
})
