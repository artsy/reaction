import { Checkbox, Sans } from "@artsy/palette"
import { FilterState, State } from "Apps/Search/FilterState"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof State
}

interface Props {
  filters: FilterState
}

@track()
export class WaysToBuyFilter extends React.Component<Props> {
  @track((props: Props, _state, [type, value]) => {
    return {
      action_type: Schema.ActionType.ClickedCommercialFilter,
      changed: { [type]: value },
      current: { ...props.filters.state },
    }
  })
  onSelect(type, value) {
    const { filters } = this.props
    filters.setFilter(type, value)
  }

  render() {
    const { filters } = this.props
    const ways: WayToBuy[] = [
      {
        disabled: false,
        name: "Buy now",
        state: "acquireable",
      },
      {
        disabled: false,
        name: "Make offer",
        state: "offerable",
      },
      {
        disabled: filters.isRangeSelected("price_range"),
        name: "Bid",
        state: "at_auction",
      },
      {
        disabled: false,
        name: "Inquire",
        state: "inquireable_only",
      },
    ]

    const constructCheckboxes = () =>
      ways.map((way, index) => {
        const props = {
          disabled: way.disabled,
          key: index,
          onSelect: value => this.onSelect(way.state, value),
          selected: filters.state[way.state],
        }

        return <Checkbox {...props}>{way.name}</Checkbox>
      })

    return (
      <React.Fragment>
        <Sans size="2" weight="medium" color="black100" my={1}>
          Ways to buy
        </Sans>
        {constructCheckboxes()}
      </React.Fragment>
    )
  }
}
