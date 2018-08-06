import { color, space } from "@artsy/palette"
import React from "react"
import { BorderProps, SizeProps, SpaceProps } from "styled-system"

import { css } from "styled-components"
import { Flex } from "Styleguide/Elements/Flex"
import { Radio } from "Styleguide/Elements/Radio"

export interface RadioGroupProps {
  disabled?: boolean
  onSelect: (selectedOption: string) => void
  defaultValue?: string
  options: Array<{ label: React.ReactNode | null; id: string }>
  renderRadio?: (
    props: {
      id: string
      label: React.ReactNode
      selected: boolean
      onSelect: () => void
      disabled: boolean
    }
  ) => React.ReactNode | null
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
  onSelectionChange = (id: string) => {
    if (id !== this.state.selectedOption) {
      this.setState({ selectedOption: id }, () => {
        this.props.onSelect(id)
      })
    }
  }
  static defaultProps = {
    renderRadio: ({ id, label, selected, onSelect, disabled }) => (
      <StyledRadio
        key={id}
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
      >
        {label}
      </StyledRadio>
    ),
  }
  render() {
    const { disabled, options, renderRadio } = this.props

    return (
      <Flex flexDirection="column">
        {options.map(({ id, label }) =>
          renderRadio({
            id,
            label,
            onSelect: () => this.onSelectionChange(id),
            selected: this.state.selectedOption === id,
            disabled,
          })
        )}
      </Flex>
    )
  }
}

const StyledRadio = Radio.extend`
  border: 1px solid #eee;
  /* offset the vertical padding to account for label line-height */
  padding: calc(${space(2)}px - 3px) ${space(2)}px;
  :not(:first-child) {
    border-top: 0;
  }
  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        background-color: ${color("black5")};
      }
    `};
`
