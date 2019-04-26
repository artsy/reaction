import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "Artsy"
import { AuctionTimerQueryRenderer } from "Components/v2/AuctionTimer"
import { Section } from "Utils/Section"

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
