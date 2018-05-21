import PropTypes from "prop-types"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { wrapperWithContext } from "../../Fixtures/Helpers"
import { Genes } from "../../Fixtures/Components"
import { GeneToolTip, GeneContainer } from "../GeneToolTip"
import { ContextProvider } from "../../../Artsy"

describe("GeneToolTip", () => {
  const getWrapper = props => {
    return mount(
      wrapperWithContext(
        {
          tooltipsData: {
            genes: [props.genes],
          },
        },
        {
          tooltipsData: PropTypes.object,
        },
        <ContextProvider>
          <GeneToolTip {...props} />
        </ContextProvider>
      )
    )
  }

  let props
  beforeEach(() => {
    props = {
      tracking: {
        trackEvent: jest.fn(),
      },
      gene: Genes[0].gene,
    }
  })

  it("Renders artist data", () => {
    const component = getWrapper(props)

    expect(component.text()).toMatch(props.gene.name)
    expect(component.text()).toMatch(
      "Capitalist Realism was another form of provocation."
    )
    expect(component.find("img").length).toBe(1)
  })

  it("Tracks clicks to gene page", () => {
    const component = getWrapper(props)
    component
      .find(GeneContainer)
      .at(0)
      .simulate("click")
    const trackingData = props.tracking.trackEvent.mock.calls[0][0]

    expect(trackingData.action).toBe("Click")
    expect(trackingData.type).toBe("intext_tooltip")
    expect(trackingData.context_module).toBe("tooltip")
    expect(trackingData.destination_path).toBe("gene/capitalist-realism")
  })
})
