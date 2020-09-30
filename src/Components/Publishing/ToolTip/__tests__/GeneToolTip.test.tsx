import { SystemContextProvider } from "Artsy"
import { FollowGeneButton } from "Components/FollowButton/FollowGeneButton"
import { Genes } from "Components/Publishing/Fixtures/Components"
import { wrapperWithContext } from "Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import PropTypes from "prop-types"
import React from "react"
import { GeneToolTip } from "../GeneToolTip"

describe("GeneTooltip", () => {
  const mediator = {
    trigger: jest.fn(),
  }
  const props = { gene: Genes[0].gene }
  const getWrapper = (passedProps = props, context = {}) => {
    return mount(
      wrapperWithContext(
        {
          ...context,
          tooltipsData: {
            genes: {
              "capitalist-realism": passedProps.gene,
            },
          },
        },
        {
          tooltipsData: PropTypes.object,
          user: PropTypes.object,
        },
        <SystemContextProvider user={(context as any).user} mediator={mediator}>
          <GeneToolTip gene={passedProps.gene} />
        </SystemContextProvider>
      )
    )
  }

  it("Renders gene data", () => {
    const component = getWrapper()
    expect(component.text()).toMatch(props.gene.name)
  })

  describe("Open Auth Modal", () => {
    it("callback gets called when followButton is clicked", () => {
      const context = {
        user: null,
      }
      const component = getWrapper(props, context)
      component.find(FollowGeneButton).simulate("click")

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        afterSignUpAction: {
          action: "follow",
          kind: "gene",
          objectId: "capitalist-realism",
        },
        contextModule: "intextTooltip",
        copy: "Sign up to follow Capitalist Realism",
        intent: "followGene",
        mode: "signup",
      })
    })
  })
})
