import { Flex, Radio, RadioGroup, Toggle } from "@artsy/palette"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

export const MediumFilter: FC = () => {
  const { aggregations, counts, ...filterContext } = useArtworkFilterContext()
  const mediums = aggregations.find(agg => agg.slice === "MEDIUM") || {
    slice: "",
    counts: [],
  }
  const allowedMediums =
    mediums && mediums.counts.length ? mediums.counts : hardcodedMediums

  const selectedMedium = filterContext.filters.medium
  const isExpanded = !counts.artworks || counts.artworks > 0

  return (
    <Toggle label="Medium" expanded={isExpanded}>
      <Flex flexDirection="column" alignItems="left" mb={1}>
        <RadioGroup
          deselectable
          defaultValue={selectedMedium}
          onSelect={selectedOption => {
            filterContext.setFilter("medium", selectedOption)
          }}
        >
          {allowedMediums.map((medium, index) => {
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
      </Flex>
    </Toggle>
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
