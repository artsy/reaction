import { Radio } from "@artsy/palette"
import { FilterState } from "Apps/Collect/FilterState"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { Subscribe } from "unstated"

export const MediumFilter: React.SFC = () => {
  return (
    <ContextConsumer>
      {({ mediator }) => {
        return (
          <Subscribe to={[FilterState]}>
            {(filters: FilterState) => {
              return (
                <>
                  {Object.keys(CategoryToMediumGeneMap).map(
                    (category, index) => {
                      const medium = CategoryToMediumGeneMap[category]
                      const isSelected = filters.state.medium === medium

                      return (
                        <Radio
                          my={0.3}
                          selected={isSelected}
                          value={medium} // to do: url
                          onSelect={({ selected }) => {
                            if (selected) {
                              return filters.setFilter(
                                "medium",
                                medium,
                                mediator
                              )
                            } else {
                              return filters.unsetFilter("medium", mediator)
                            }
                          }}
                          key={index}
                          label={category}
                        />
                      )
                    }
                  )}
                </>
              )
            }}
          </Subscribe>
        )
      }}
    </ContextConsumer>
  )
}

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
