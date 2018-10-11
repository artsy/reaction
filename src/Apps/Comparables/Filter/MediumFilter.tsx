import { FilterState } from "Apps/Collect/FilterState"
import React from "react"

import { Radio } from "@artsy/palette"
import { SystemProps } from "Artsy/SystemContext"

export const MediumFilter: React.SFC<{
  filters: FilterState
  mediator: SystemProps["mediator"]
}> = ({ filters, mediator }) => (
  <>
    {Object.keys(CategoryToMediumGeneMap).map((category, index) => {
      const medium = CategoryToMediumGeneMap[category]
      const isSelected = filters.state.medium === medium

      return (
        <Radio
          my={0.3}
          selected={isSelected}
          value={medium} // to do: url
          onSelect={({ selected }) => {
            if (selected) {
              return filters.setFilter("medium", medium, mediator)
            } else {
              return filters.unsetFilter("medium", mediator)
            }
          }}
          key={index}
        >
          {category}
        </Radio>
      )
    })}
  </>
)

export const CategoryToMediumGeneMap = {
  Print: "prints",
  "Performance Art": "performance-art",
  Painting: "painting",
  Sculpture: "sculpture",
  "Drawing, Collage Or Other Work On Paper": "work-on-paper",
  Photography: "photography",
  "Mixed Media": "mixed-media",
  Installation: "installation",
  "Video/Film/Animation": "film-slash-video",
  Architecture: "architecture",
  "Design/Decorative Art": "design",
  Jewelry: "jewelry",
}
