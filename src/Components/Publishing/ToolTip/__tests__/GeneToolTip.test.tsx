import { mount } from "enzyme"
import "jest-styled-components"
import PropTypes from "prop-types"
import React from "react"
import { ContextProvider } from "../../../Artsy"
import { FollowGeneButton } from "../../../FollowButton/FollowGeneButton"
import { Genes } from "../../Fixtures/Components"
import { wrapperWithContext } from "../../Fixtures/Helpers"
import { GeneToolTip } from "../GeneToolTip"

describe("GeneTooltip", () => {
  const getWrapper = (props, context = {}) => {
    return mount(
      wrapperWithContext(
        {
          ...context,
          tooltipsData: {
            genes: [props.gene],
          },
        },
        {
          tooltipsData: PropTypes.object,
          onOpenAuthModal: PropTypes.func,
          currentUser: PropTypes.object,
        },
        <ContextProvider currentUser={(context as any).currentUser}>
          <GeneToolTip gene={props.gene} />
        </ContextProvider>
      )
    )
  }

  it("Renders gene data", () => {
    const gene = Genes[0].gene
    const component = getWrapper({ gene })

    expect(component.text()).toMatch(gene.name)
  })

  describe("Open Auth Modal", () => {
    it("callback gets called when followButton is clicked", () => {
      const gene = Genes[0].gene
      const context = {
        onOpenAuthModal: jest.fn(),
        currentUser: null,
      }
      const component = getWrapper({ gene }, context)
      component.find(FollowGeneButton).simulate("click")
      const args = context.onOpenAuthModal.mock.calls[0]

      expect(args[0]).toBe("register")
      expect(args[1].contextModule).toBe("intext tooltip")
      expect(args[1].intent).toBe("follow gene")
    })
  })
})
