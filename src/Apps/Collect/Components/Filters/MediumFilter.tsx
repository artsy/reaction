import { Radio, RadioGroup } from "@artsy/palette"
import { SystemContextConsumer } from "Artsy"
import React from "react"
import { FilterState } from "../../FilterState"

export const MediumFilter: React.SFC<{
  filters: FilterState
  mediums: Array<{
    id: string
    name: string
  }>
}> = ({ filters, mediums }) => {
  const allowedMediums = mediums && mediums.length ? mediums : hardcodedMediums

  return (
    <SystemContextConsumer>
      {({ mediator }) => {
        const selectedMedium = filters.state.medium

        return (
          <RadioGroup
            deselectable
            defaultValue={selectedMedium}
            onSelect={selectedOption => {
              filters.setFilter("medium", selectedOption, mediator)
            }}
          >
            {allowedMediums.map((medium, index) => {
              return (
                <Radio
                  my={0.3}
                  value={medium.id}
                  key={index}
                  label={medium.name}
                />
              )
            })}
          </RadioGroup>
        )
      }}
    </SystemContextConsumer>
  )
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
