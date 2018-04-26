import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Gene } from "../../Fixtures/Components"
import { GeneToolTip } from "../Gene"
import { ToolTip } from "../ToolTip"

describe("ToolTip", () => {
  describe("snapshots", () => {
    it("Renders properly", () => {
      const component = renderer
        .create(<ToolTip model="gene" entity={Gene} />)
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  it("Renders a gene", () => {
    const component = mount(<ToolTip model="gene" entity={Gene} />)
    expect(component.find(GeneToolTip).length).toBe(1)
    expect(component.text()).toMatch(Gene.name)
  })
})
