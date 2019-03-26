import { Radio, RadioGroup } from "@artsy/palette"
import { FilterState } from "Apps/Search/FilterState"
import React from "react"

interface Props {
  filters: FilterState
  mediums: Array<{
    id: string
    name: string
  }>
}

export class MediumFilter extends React.Component<Props> {
  onClick(value) {
    const { filters } = this.props
    filters.setFilter("medium", value)
  }

  render() {
    const { mediums, filters } = this.props
    const allowedMediums =
      mediums && mediums.length ? mediums : hardcodedMediums

    const radioButtons = allowedMediums.map((medium, index) => {
      return (
        <Radio key={index} my={0.3} value={medium.id} label={medium.name} />
      )
    })

    const selectedMedium = filters.state.medium

    return (
      <RadioGroup
        defaultValue={selectedMedium}
        onSelect={selectedOption => {
          this.onClick(selectedOption)
        }}
      >
        {radioButtons}
      </RadioGroup>
    )
  }
}

const hardcodedMediums = [
  {
    id: "painting",
    name: "Painting",
  },
  {
    id: "photography",
    name: "Photography",
  },
  {
    id: "sculpture",
    name: "Sculpture",
  },
  {
    id: "prints",
    name: "Prints",
  },
  {
    id: "work-on-Paper",
    name: "Work on Paper",
  },
  {
    id: "design",
    name: "Design",
  },
  {
    id: "drawing",
    name: "Drawing",
  },
  {
    id: "installation",
    name: "Installation",
  },
  {
    id: "film-slash-video",
    name: "Film/Video",
  },
  {
    id: "jewelry",
    name: "Jewelry",
  },
  {
    id: "performance-art",
    name: "Performance Art",
  },
]
