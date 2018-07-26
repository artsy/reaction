import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep } from "lodash"
import React from "react"
import renderer from "react-test-renderer"
import {
  ClassicArticle,
  ClassicArticleManyAuthors,
} from "../../../Fixtures/Articles"
import { EditableChild } from "../../../Fixtures/Helpers"
import { ClassicHeader } from "../ClassicHeader"

describe("Classic Header", () => {
  describe("Snapshots", () => {
    it("renders properly", () => {
      const snapshot = renderer
        .create(<ClassicHeader article={ClassicArticle} />)
        .toJSON()
      expect(snapshot).toMatchSnapshot()
    })

    it("renders editable props properly", () => {
      const snapshot = renderer
        .create(
          <ClassicHeader
            article={ClassicArticle}
            date="2015-06-19T13:09:18.567Z"
            editLeadParagraph={EditableChild("Lead Paragraph")}
            editTitle={EditableChild("Title")}
          />
        )
        .toJSON()
      expect(snapshot).toMatchSnapshot()
    })
  })

  describe("Unit", () => {
    const getWrapper = props => {
      return mount(<ClassicHeader {...props} />)
    }
    let props
    beforeEach(() => {
      props = {
        article: cloneDeep(ClassicArticle),
      }
    })

    it("Renders title", () => {
      const component = getWrapper(props)
      expect(component.text()).toMatch(ClassicArticle.title)
      expect(component.text()).toMatch(ClassicArticle.author.name)
    })

    it("Renders lead paragraph", () => {
      const component = getWrapper(props)
      expect(component.text()).toMatch("Critics were skeptical of Bambi")
    })

    it("Renders author", () => {
      const component = getWrapper(props)
      expect(component.text()).toMatch(ClassicArticle.author.name)
    })

    it("Renders contributing authors", () => {
      props.article = ClassicArticleManyAuthors
      const component = getWrapper(props)
      expect(component.text()).toMatch(ClassicArticle.author.name)
      expect(component.text()).toMatch(
        "By First Author, Second Author and Third Author"
      )
    })

    describe("Editing", () => {
      it("Renders editable title", () => {
        props.editTitle = EditableChild("Title")
        const component = getWrapper(props)
        expect(component.text()).toMatch("Child Title")
      })

      it("Renders lead paragraph", () => {
        props.editLeadParagraph = EditableChild("Lead Paragraph")
        const component = getWrapper(props)
        expect(component.text()).toMatch("Child Lead Paragraph")
      })

      it("Renders a custom date", () => {
        props.date = "2017-05-19T13:09:18.567Z"
        const component = getWrapper(props)
        expect(component.text()).toMatch("May 19, 2017 9:09 am")
      })
    })
  })
})
