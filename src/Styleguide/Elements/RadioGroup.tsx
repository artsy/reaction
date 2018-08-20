import React from "react"

import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { RadioProps } from "Styleguide/Elements/Radio"

export interface RadioGroupProps extends FlexProps {
  disabled?: boolean
  onSelect?: (selectedOption: string) => void
  defaultValue?: string
  children: Array<React.ReactElement<RadioProps>>
}

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
    const { disabled, onSelect, defaultValue, children, ...others } = this.props
    return (
      <Flex flexDirection="column" {...others}>
        {this.renderRadioButtons()}
      </Flex>
    )
  }
}
