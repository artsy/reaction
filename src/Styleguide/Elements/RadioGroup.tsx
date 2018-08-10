import React from "react"
import { BorderProps, SizeProps, SpaceProps } from "styled-system"

import { BorderBox } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Join } from "Styleguide/Elements/Join"
import { RadioProps } from "Styleguide/Elements/Radio"
import { Separator } from "Styleguide/Elements/Separator"

export interface RadioGroupElementProps {
  value?: string
}

export interface RadioGroupProps {
  disabled?: boolean
  onSelect?: (selectedOption: string) => void
  defaultValue?: string
  children: Array<React.ReactElement<RadioProps>>
}

export interface RadioGroupToggleProps
  extends RadioGroupProps,
    BorderProps,
    SizeProps,
    SpaceProps {}

interface RadioGroupState {
  selectedOption: string | null
}

export class RadioGroup extends React.Component<
  RadioGroupProps,
  RadioGroupState
> {
  state = {
    selectedOption: this.props.defaultValue || null,
  }

  onSelect = ({ selected, value }) => {
    if (this.props.onSelect) {
      this.props.onSelect(value)
    }

    this.setState({ selectedOption: value })
  }

  renderRadioButtons() {
    return React.Children.map(
      this.props.children,
      (child: React.ReactElement<RadioProps>) => {
        return React.cloneElement(child, {
          disabled:
            child.props.disabled !== undefined
              ? child.props.disabled
              : this.props.disabled,
          onSelect: child.props.onSelect
            ? selected => {
                this.onSelect(selected)
                child.props.onSelect(selected)
              }
            : this.onSelect,
          // FIXME: Throw an error `child.props.selected' is set once we enable the dev code elimination.
          selected: this.state.selectedOption === child.props.value,
        })
      }
    )
  }

  render() {
    return (
      <Flex flexDirection="column" p={2}>
        {this.renderRadioButtons()}
      </Flex>
    )
  }
}

export class BorderedRadioGroup extends RadioGroup {
  render() {
    return (
      <BorderBox flexDirection="column" p={2}>
        <Join separator={<Separator mx={-2} my={2} width="inherit" />}>
          {this.renderRadioButtons()}
        </Join>
      </BorderBox>
    )
  }
}
