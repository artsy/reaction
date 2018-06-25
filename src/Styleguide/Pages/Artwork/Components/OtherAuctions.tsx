import { Serif } from "@artsy/palette"
import { take } from "lodash"
import React, { ReactNode } from "react"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { Responsive } from "Styleguide/Utils/Responsive"

interface OtherAuctionsProps {
  children: ReactNode[]
}
export class OtherAuctions extends React.Component<OtherAuctionsProps> {
  render() {
    return (
      <Responsive>
        {({ md, sm, xs }) => {
          if (xs) return <SmallOtherAuctions {...this.props} />
          else if (sm || md) {
            return <LargeOtherAuctions cardsPerRow={3} {...this.props} />
          }
          return <LargeOtherAuctions {...this.props} />
        }}
      </Responsive>
    )
  }
}

const LargeOtherAuctions = ({ cardsPerRow = 4, children }) => (
  <Flex flexDirection="column" width="100%" alignItems="center">
    <Serif size="8" mb={1}>
      Other auctions
    </Serif>
    <Button variant="secondaryOutline" size="medium" mb={3}>
      View All
    </Button>
    <Grid fluid>
      <Row>
        {take(children, cardsPerRow).map((child, index) => (
          <Col key={`${index}-${cardsPerRow}`} col={12 / cardsPerRow}>
            {child}
          </Col>
        ))}
      </Row>
    </Grid>
  </Flex>
)

const SmallOtherAuctions = props => (
  <React.Fragment>
    <Serif size="8" mb={1}>
      Other auctions
    </Serif>
    <Button variant="secondaryOutline" size="medium" mb={3}>
      View All
    </Button>
    <hr />
    {take(props.children, 3)}
  </React.Fragment>
)
