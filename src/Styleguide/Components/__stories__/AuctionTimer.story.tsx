import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "Artsy/SystemContext"
import { AuctionTimerQueryRenderer } from "Styleguide/Components/AuctionTimer"
import { Section } from "Styleguide/Utils"

storiesOf("Styleguide/Components", module).add("AuctionTimer", () => {
  return (
    <React.Fragment>
      <Section title="Cambi Design">
        <SystemContextProvider>
          <AuctionTimerQueryRenderer saleID="cambi-fine-design-1" />
        </SystemContextProvider>
      </Section>
      <Section title="EHC Fine Art">
        <SystemContextProvider>
          <AuctionTimerQueryRenderer saleID="ehc-fine-art-essential-editions-vii" />
        </SystemContextProvider>
      </Section>
    </React.Fragment>
  )
})
