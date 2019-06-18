import { Radio, RadioGroup } from "@artsy/palette"
import { FilterContextValues, Filters } from "Apps/Search/FilterContext"
import React from "react"

interface Props {
  filterContext: FilterContextValues
  mediums: Array<{
    id: string
    name: string
  }>
}

export class MediumFilter extends React.Component<Props> {
  onClick(value) {
    const { filterContext } = this.props
    filterContext.setFilter("medium", value)
  }

  render() {
    const { mediums, filterContext } = this.props
    const allowedMediums =
      mediums && mediums.length ? mediums : hardcodedMediums

    const selectedMedium = filterContext.filters.medium

    return (
      <RadioGroup
        deselectable
        defaultValue={selectedMedium}
        onSelect={selectedOption => {
          this.onClick(selectedOption)
        }}
      >
        {allowedMediums.map((medium, index) => {
          return (
            <Radio key={index} my={0.3} value={medium.id} label={medium.name} />
          )
        })}
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
