import { Button } from "@artsy/palette"
import { ClassicArticlePromotedContent } from "Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import { cloneDeep } from "lodash"
import React from "react"
import { ClassicPromotedContent } from "../ClassicPromotedContent"

describe("FeatureBasicHeader", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<ClassicPromotedContent {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: cloneDeep(ClassicArticlePromotedContent),
    }
  })

  it("Renders expected content for partner galleries", () => {
    delete props.article.sale
    props.article.partner = {
      default_profile_id: "contessa-gallery",
      name: "Contessa Gallery",
      type: "Gallery",
      profile: {
        id: "contessa-gallery",
        href: "/contessa-gallery",
        image: {
          cropped: {
            url:
              "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=250&height=165&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FOyZ08tRGQ1k-ue1nk06vlQ%2Fsquare.jpg",
          },
        },
      },
    }
    const component = getWrapper()
    expect(component.text()).toMatch("Promoted Content")
    expect(component.text()).toMatch("Contessa Gallery")
    expect(component.find(Button).text()).toMatch("Explore Gallery")
    expect(component.html()).toMatch("square.jpg")
  })

  it("Renders expected content for auctions", () => {
    const component = getWrapper()
    expect(component.text()).toMatch("Promoted Content")
    expect(component.text()).toMatch("ICI: Benefit Auction 2019")
    expect(component.find(Button).text()).toMatch("Explore Auction")
    expect(component.html()).toMatch("large_rectangle.jpg")
  })
})
