import React from "react"
import { mount } from "enzyme"
import "jest-styled-components"
import { Link, LinkWithTooltip } from "../LinkWithTooltip"

describe("LinkWithTooltip", () => {
  it("Renders correctly", () => {
    const wrapper = mount(
      <LinkWithTooltip
        url="https://www.artsy.net/artist/judy-chicago"
        node={node}
      >
        Judy
      </LinkWithTooltip>
    )

    expect(wrapper.text()).toContain(`Judy`)
  })

  it("extracts entity type from URL", () => {
    const wrapper = mount(
      <LinkWithTooltip
        url="https://www.artsy.net/artist/judy-chicago"
        node={node}
      />
    )

    const instance: any = wrapper.instance()

    expect(instance.urlToEntityType()).toEqual({
      entityType: "artist",
      slug: "judy-chicago",
    })
  })

  it("correctly gets data from tooltips context", () => {
    const wrapper = mount(
      <LinkWithTooltip
        url="https://www.artsy.net/artist/judy-chicago"
        node={node}
      >
        Judy
      </LinkWithTooltip>,
      { context }
    )

    const instance: any = wrapper.instance()
    expect(instance.entityTypeToEntity()).toEqual({
      entityType: "artist",
      entity: context.tooltipsData.artists["judy-chicago"],
    })
  })

  it("ToolTip correctly shows on hover", () => {
    const wrapper = mount(
      <LinkWithTooltip
        url="https://www.artsy.net/artist/judy-chicago"
        node={node}
      >
        Judy
      </LinkWithTooltip>,
      { context }
    )

    const promise = (wrapper
      .find(Link)
      .props()
      .onMouseEnter(null) as any) as Promise<any>

    return promise.then(() => {
      return expect(wrapper.state("show")).toBeTruthy()
    })
  })

  it("ToolTip correctly hides on hover", () => {
    const wrapper = mount(
      <LinkWithTooltip
        url="https://www.artsy.net/artist/judy-chicago"
        node={node}
      >
        Judy
      </LinkWithTooltip>,
      { context }
    )

    const promise = (wrapper
      .find(Link)
      .props()
      .onMouseLeave(null) as any) as Promise<any>

    return promise.then(() => {
      return expect(wrapper.state("show")).toBeFalsy()
    })
  })
})

const node = {
  name: "a",
  type: "tag",
  attribs: {
    href: "https://www.artsy.net/artist/judy-chicago",
  },
  children: [
    {
      type: "text",
      data: "Judy",
    },
  ],
}

const context = {
  tooltipsData: {
    artists: {
      "judy-chicago": {
        carousel: {
          images: [
            {
              resized: {
                url:
                  "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=266&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbPIv_6ZQufLqqdPN93WYBA%2Flarge.jpg",
                width: 266,
                height: 200,
              },
            },
            {
              resized: {
                url:
                  "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=230&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fv5O-bcNDItu838c7l-49sg%2Flarge.jpg",
                width: 230,
                height: 200,
              },
            },
          ],
        },
        id: "judy-chicago",
        formatted_nationality_and_birthday: "American, b. 1939",
        href: "/artist/judy-chicago",
        blurb:
          "Synonymous with early [feminist art](/gene/feminist-art), Judy Chicago has been challenging the male-dominated art world since the 1970s. Her characteristically colorful body of work includes paintings, tapestries, sculpture, and mixed-media installations celebrating women’s achievements. Chicago legally assumed the name of her hometown after becoming a widow at the age of 23, symbolizing her lifelong struggle with identity, which she chronicles in _Through the Flower: My Struggle as a Woman Artist_ (1975). In homage to 1,038 women central to the history of Western civilization, Chicago’s most celebrated work, [_The Dinner Party_](/artwork/judy-chicago-the-dinner-party) (1974-79), exemplifies her ongoing endeavor as an artist, educator, and author to elevate women from the margins of society and history. The work—on permanent display at The Brooklyn Museum—features 39 place settings meant to represent famous women from history, from Joan of Arc to Emily Dickinson, with a further 999 names inscribed on the floor.",
        name: "Judy Chicago",
        collections: ["Museum of Modern Art (MoMA)"],
      },
    },
  },
}
