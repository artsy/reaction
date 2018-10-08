import React from "react"
import renderer from "react-test-renderer"
import styled, { css } from "styled-components"
import * as Media from "../Media"

describe("Media", () => {
  describe("Query", () => {
    it("creates a container that will only display when its query matches", () => {
      const query = renderer
        .create(<Media.Query query="(width:100px)">ohai</Media.Query>)
        .toJSON()
      expect(query.type).toEqual("div")
      expect(query).toHaveStyleRule("display", "none")
      expect(query).toHaveStyleRule("display", "block", {
        media: "(width:100px)",
      })
    })

    describe("when negated", () => {
      it("creates a container that will only display when its query does not match", () => {
        const query = renderer
          .create(
            <Media.Query not query="(width:100px)">
              ohai
            </Media.Query>
          )
          .toJSON()
        expect(query.type).toEqual("div")
        expect(query).toHaveStyleRule("display", "none")
        expect(query).toHaveStyleRule("display", "block", {
          media: "not all and (width:100px)",
        })
      })
    })

    describe("with a render prop", () => {
      it("yields the generated style such that it can be applied to another element", () => {
        const query = renderer
          .create(
            <Media.Query query="(width:100px)">
              {generatedStyle => {
                const Component = styled.span`
                  ${generatedStyle({ display: "inline" })};
                `
                return <Component>ohai</Component>
              }}
            </Media.Query>
          )
          .toJSON()
        expect(query.type).toEqual("span")
        expect(query).toHaveStyleRule("display", "none")
        expect(query).toHaveStyleRule("display", "inline", {
          media: "(width:100px)",
        })
      })

      it("yields the generated style and allows adding styles to the matching media selector", () => {
        const query = renderer
          .create(
            <Media.Query query="(width:100px)">
              {generatedStyle => {
                const Component = styled.div`
                  ${generatedStyle({
                    style: css`
                      color: red;
                    `,
                  })};
                `
                return <Component>ohai</Component>
              }}
            </Media.Query>
          )
          .toJSON()
        expect(query.type).toEqual("div")
        expect(query).not.toHaveStyleRule("color", "red")
        expect(query).toHaveStyleRule("color", "red", {
          media: "(width:100px)",
        })
      })
    })
  })

  describe("Match", () => {
    const behavesLikeMatchers = (Component, not, expectations) => {
      const Small = Media.Query.create("(width: 100px)")
      const Large = Media.Query.create("(height: 200px)")
      const matchers = [Small, Large]

      const variants = ["any", "all"]
      variants.forEach(variant => {
        it(`matches ${variant} of the given queries`, () => {
          const props = { [variant]: matchers }
          const query = renderer
            .create(
              <Component not={not} {...props}>
                ohai
              </Component>
            )
            .toJSON()
          expect(query).toHaveStyleRule("display", "none")
          expect(query).toHaveStyleRule("display", "block", {
            media: expectations[variant],
          })
        })
      })

      it("adds styling to each specific matching query in the `any` list", () => {
        const query = renderer
          .create(
            <Component not={not} any={matchers}>
              {(generatedStyle, matcherStyle) => {
                const StyledComponent = styled.div`
                  ${generatedStyle()};
                  ${matcherStyle(
                    Small,
                    css`
                      color: red;
                    `
                  )};
                  ${matcherStyle(
                    Large,
                    css`
                      color: blue;
                    `
                  )};
                `
                return <StyledComponent>ohai</StyledComponent>
              }}
            </Component>
          )
          .toJSON()
        expect(query).not.toHaveStyleRule("color", "red")
        expect(query).not.toHaveStyleRule("color", "blue")
        expect(query).toHaveStyleRule("color", "red", {
          media: expectations.anyStyling.small,
        })
        expect(query).toHaveStyleRule("color", "blue", {
          media: expectations.anyStyling.large,
        })
      })
    }

    behavesLikeMatchers(Media.Match, false, {
      all: "(width:100px) and (height:200px)",
      any: "(width:100px),(height:200px)",
      anyStyling: { small: "(width:100px)", large: "(height:200px)" },
    })

    describe("when negated does not", () => {
      behavesLikeMatchers(Media.Match, true, {
        all: "not all and (width:100px) and (height:200px)",
        any: "not all and (width:100px),not all and (height:200px)",
        anyStyling: {
          small: "not all and (width:100px)",
          large: "not all and (height:200px)",
        },
      })
    })
  })
})
