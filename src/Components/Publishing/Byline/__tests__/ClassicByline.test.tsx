import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  ClassicArticle,
  ClassicArticleManyAuthors,
} from "../../Fixtures/Articles"
import { ClassicByline } from "../ClassicByline"

describe("ClassicByline", () => {
  describe("Snapshots", () => {
    it("renders a single author", () => {
      const snapshot = renderer.create(
        <ClassicByline article={ClassicArticleManyAuthors} />
      )
      expect(snapshot).toMatchSnapshot()
    })

    it("renders multiple authors", () => {
      const snapshot = renderer.create(
        <ClassicByline article={ClassicArticleManyAuthors} />
      )
      expect(snapshot).toMatchSnapshot()
    })

    it("renders a custom date", () => {
      const snapshot = renderer.create(
        <ClassicByline
          article={ClassicArticleManyAuthors}
          date={"2017-05-19T13:09:18.567Z"}
        />
      )
      expect(snapshot).toMatchSnapshot()
    })
  })

  describe("Unit", () => {
    const getWrapper = _props => {
      return mount(<ClassicByline {..._props} />)
    }
    let props
    beforeEach(() => {
      props = {
        article: ClassicArticle,
      }
    })

    it("renders a single author", () => {
      const component = getWrapper(props)
      expect(component.text()).toMatch("Joanne Artman Gallery")
    })

    it("renders multiple authors", () => {
      props.article = ClassicArticleManyAuthors
      const component = getWrapper(props)
      expect(component.text()).toMatch("Joanne Artman Gallery")
      expect(component.text()).toMatch(
        "By First Author, Second Author and Third Author"
      )
    })

    it("renders published date", () => {
      const component = getWrapper(props)
      expect(component.text()).toMatch("Jul 28, 2017 4:38 pm")
    })

    it("renders a custom date", () => {
      props.date = "2017-05-19T13:09:18.567Z"
      const component = getWrapper(props)
      expect(component.text()).toMatch("May 19, 2017 9:09 am")
    })
  })
})
