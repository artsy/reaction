import { themeProps } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { Responsive, ResponsiveProvider } from "../index"

describe("Responsive", () => {
  it("immediately renders with the initial media query", () => {
    const tree = mount(
      <ResponsiveProvider
        mediaQueries={themeProps.mediaQueries}
        initialMatchingMediaQueries={["xs", "md"]}
      >
        <Responsive>
          {mediaQueries => (
            <div>
              {Object.keys(mediaQueries)
                .filter(key => mediaQueries[key])
                .sort()
                .join(", ")}
            </div>
          )}
        </Responsive>
      </ResponsiveProvider>
    )
    expect(tree.find("div").text()).toEqual("md, xs")
  })
})
