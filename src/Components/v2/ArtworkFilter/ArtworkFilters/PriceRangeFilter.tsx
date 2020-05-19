import React from "react"
import { Flex, Radio, RadioGroup, Toggle } from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

export const PriceRangeFilter: React.FC = () => {
  const filterContext = useArtworkFilterContext()
  const initialRange = filterContext.filters.priceRange
  // what if the range doesnt exist? like 0-3000

  return (
    <Toggle label="Price" expanded>
      <Flex flexDirection="column" alignItems="left" my={1}>
        <RadioGroup
          deselectable
          defaultValue={initialRange}
          onSelect={selectedOption => {
            filterContext.setFilter("priceRange", selectedOption)
          }}
          disabled={filterContext.filters.atAuction ?? false}
          //   disabledText="Disabled for biddable works"
        >
          {priceRanges.map((range, index) => (
            <Radio
              key={`${index}`}
              my={0.3}
              label={range.name}
              value={range.value}
            />
          ))}
        </RadioGroup>
      </Flex>
    </Toggle>
  )
}

const priceRanges = [
  {
    name: "$50,000+",
    value: "50000-*", // is that right?
  },
  // how do i get 40k - 50k?!
  /// dollars is ok?
  {
    name: "$20,000 - $40,000",
    value: "20000-40000",
  },
  {
    name: "$10,000 - $20,000",
    value: "10000-20000",
  },
  {
    name: "$5,000 - $10,000",
    value: "5000-10000",
  },
  {
    name: "$1,000 - $5,000",
    value: "1000-5000",
  },
  {
    name: "$0 - $1,000",
    value: "0-1000",
  },
]
