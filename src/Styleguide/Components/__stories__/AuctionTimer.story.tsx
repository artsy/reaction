import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { ContextProvider } from "Artsy/SystemContext"
import { AuctionTimerQueryRenderer } from "Styleguide/Components/AuctionTimer"
import { Section } from "Styleguide/Utils"

storiesOf("Styleguide/Components", module).add("AuctionTimer", () => {
  return (
    <React.Fragment>
      <Section title="Cambi Design">
        <ContextProvider>
          <AuctionTimerQueryRenderer saleID="cambi-fine-design-1" />
        </ContextProvider>
      </Section>
      <Section title="EHC Fine Art">
        <ContextProvider>
          <AuctionTimerQueryRenderer saleID="ehc-fine-art-essential-editions-vii" />
        </ContextProvider>
      </Section>
    </React.Fragment>
  )
})
