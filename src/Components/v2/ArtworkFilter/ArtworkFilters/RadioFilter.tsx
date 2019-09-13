import { Radio, RadioGroup } from "@artsy/palette"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

export const RadioFilter: FC = props => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const {
    label,
    category,
    aggregation: { slice, counts },
  } = props

  const items = aggregations.find(agg => agg.slice === slice) || {
    slice: "",
    counts: [],
  }
  const selectedMedium = filterContext.filters[category]

  return (
    <RadioGroup
      deselectable
      defaultValue={selectedMedium}
      onSelect={selectedOption => {
        filterContext.setFilter("medium", selectedOption)
      }}
    >
      {items.counts.map((medium, index) => {
        return (
          <Radio
            key={index}
            my={0.3}
            value={medium.id.toLocaleLowerCase()}
            label={medium.name}
          />
        )
      })}
    </RadioGroup>
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
