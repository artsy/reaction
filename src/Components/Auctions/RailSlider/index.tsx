import React, { SFC } from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps, ContextProvider } from "../../Artsy"
import { Slider } from "./Slider"

interface Props extends ContextProps {
  saleID: string
}

const SliderContainer = ContextConsumer((props: Props) => {
  const { saleID, relayEnvironment } = props

  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query RailSliderQuery($saleID: String!) {
          sale(id: $saleID) {
            ...Slider_sale
          }
        }
      `}
      variables={{ saleID }}
      render={response => {
        if (response.props) {
          return <Slider sale={response.props.sale} />
        } else {
          return null
        }
      }}
    />
  )
})

export const RailSlider: SFC = () => {
  return (
    <ContextProvider>
      <SliderContainer saleID="forum-auctions-modern-icons" />
    </ContextProvider>
  )
}
