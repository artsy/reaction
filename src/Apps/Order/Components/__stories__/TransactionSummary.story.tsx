import { TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Flex } from "Styleguide/Elements/Flex"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Apps/Order/Components", module).add("TransactionSummary", () => {
  return (
    <Section title="Price Summary">
      <Flex width={280} flexDirection="column">
        <TransactionSummary
          price="£3,024.89"
          shipping="£132.32"
          tax="£232.23"
          total="£1,200,823.33"
          artistName="Francesca DiMattio"
          artworkName="The Fox and the Hound, 2018"
          artworkLocation="New York, NY"
          imageURL="https://d32dm0rphc51dk.cloudfront.net/SCShf97jlpFZpDBJUBqntg/small.jpg"
          sellerName="Salon 94"
        />
      </Flex>
    </Section>
  )
})
