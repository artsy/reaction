import { ArtworkGrid_viewer } from "__generated__/ArtworkGrid_viewer.graphql"
import { SystemProps } from "Artsy/SystemContext"
import React from "react"
import { FilterState } from "../../FilterState"

import { Radio } from "@artsy/palette"

export const MediumFilter: React.SFC<{
  filters: FilterState
  mediums: ArtworkGrid_viewer["filter_artworks"]["aggregations"][0]["counts"]
  mediator: SystemProps["mediator"]
}> = ({ filters, mediums, mediator }) => (
  <>
    {mediums.map((medium, index) => {
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
    })}
  </>
)
