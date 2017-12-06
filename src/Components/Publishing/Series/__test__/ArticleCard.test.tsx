import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { getDate } from '../../Constants'
import { SeriesArticle, StandardArticle, VideoArticle } from "../../Fixtures/Articles"
import { ArticleCard } from "../ArticleCard"

describe("ArticleCard", () => {
  let standardArticle
  let videoArticle

  beforeEach(() => {
    videoArticle = VideoArticle
    standardArticle = StandardArticle
  })
  
  it("renders an article properly", () => {
    const component = renderer.create(<ArticleCard article={standardArticle} series={SeriesArticle} />).toJSON()

    expect(component).toMatchSnapshot()
  })

  it("renders an article with unpublished media properly", () => {
    const component = renderer.create(<ArticleCard article={videoArticle} series={SeriesArticle} />).toJSON()

    expect(component).toMatchSnapshot()
  })

  it("Renders media duration and play icon if article has media and is published", () => {
    videoArticle.media.published = true
    const component = mount(<ArticleCard article={videoArticle} series={SeriesArticle} />)

    expect(component.find('.IconPlayCaret').length).toBe(1)
    expect(component.text()).toMatch('03:12')
  })

  it("Renders coming soon and available date if article has media and is unpublished", () => {
    videoArticle.media.published = false
    const component = mount(<ArticleCard article={videoArticle} series={SeriesArticle} />)

    expect(component.find('.IconPlayCaret').length).toBe(0)
    expect(component.text()).not.toMatch('03:12')
    expect(component.text()).toMatch('Coming Soon')
    expect(component.text()).toMatch('Available ')
  })

  it("Does not render byline if article has media", () => {
    const component = mount(<ArticleCard article={videoArticle} series={SeriesArticle} />)

    expect(component.find('.author').length).toBe(0)
  })

  it("Renders the media release_date if present", () => {
    const component = mount(<ArticleCard article={videoArticle} series={SeriesArticle} />)
    const renderedDate = component.find('.date').first().text()
    const formattedDate = getDate(videoArticle.media.release_date, 'condensed')

    expect(renderedDate).toBe(formattedDate)
  })

  it("Renders the published_at date if no release_date and media is present", () => {
    delete videoArticle.media.release_date
    const component = mount(<ArticleCard article={videoArticle} series={SeriesArticle} />)
    const renderedDate = component.find('.date').first().text()
    const formattedDate = getDate(videoArticle.published_at, 'condensed')

    expect(renderedDate).toBe(formattedDate)
  })
})