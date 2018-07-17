import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import Waypoint from "react-waypoint"
import { RelatedPanel } from "../../Fixtures/Components"
import { ArticleLink, RelatedArticlesPanel } from "../RelatedArticlesPanel"

describe("RelatedArticlesPanel", () => {
  const getWrapper = props => {
    return mount(<RelatedArticlesPanel {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      articles: RelatedPanel,
      tracking: {
        trackEvent: jest.fn(),
      },
    }
  })

  it("renders the related articles panel", () => {
    const related = renderer
      .create(<RelatedArticlesPanel articles={RelatedPanel} />)
      .toJSON()
    expect(related).toMatchSnapshot()
  })

  it("renders a default label", () => {
    const component = getWrapper(props)
    expect(component.text()).toMatch("Related Stories")
  })

  it("renders a provided label", () => {
    props.label = "The Best Stories"
    const component = getWrapper(props)
    expect(component.text()).toMatch("The Best Stories")
  })

  it("renders links", () => {
    const component = getWrapper(props)
    expect(component.find(ArticleLink)).toHaveLength(3)
  })

  it("tracks link clicks", () => {
    const component = getWrapper(props)
    component
      .find(ArticleLink)
      .at(0)
      .simulate("click")
    const trackCall = props.tracking.trackEvent.mock.calls[0][0]

    expect(trackCall.action).toBe("Clicked article impression")
    expect(trackCall.destination_path).toBe(
      "/article/artsy-editorial-15-top-art-schools-united-states"
    )
    expect(trackCall.entity_id).toBe("52d99185cd530e581300006c")
    expect(trackCall.entity_type).toBe("article")
    expect(trackCall.flow).toBe("article")
    expect(trackCall.impression_type).toBe("Related article")
    expect(trackCall.type).toBe("link")
  })

  it("Calls a tracking impression", () => {
    const component = getWrapper(props)
    component
      .find(Waypoint)
      .getElement()
      .props.onEnter()
    const trackCall = props.tracking.trackEvent.mock.calls[0][0]

    expect(trackCall.action).toBe("article_impression")
    expect(trackCall.impression_type).toBe("Related articles")
  })
})
