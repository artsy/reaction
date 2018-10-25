import { Radio } from "@artsy/palette"
import { ContextConsumer } from "Artsy/SystemContext"
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
    <ContextConsumer>
      {({ mediator }) =>
        allowedMediums.map((medium, index) => {
          const isSelected = filters.state.medium === medium.id

          return (
            <Radio
              my={0.3}
              selected={isSelected}
              value={medium.id}
              onSelect={({ selected }) => {
                if (selected) {
                  return filters.setFilter("medium", medium.id, mediator)
                } else {
                  return filters.unsetFilter("medium", mediator)
                }
              }}
              key={index}
            >
              {medium.name}
            </Radio>
          )
        })
      }
    </ContextConsumer>
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
