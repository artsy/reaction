import { Button, Flex, Serif } from "@artsy/palette"
import { take } from "lodash"
import React, { ReactNode } from "react"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { Media } from "Utils/Responsive"

interface OtherAuctionsProps {
  children: ReactNode[]
}
export class OtherAuctions extends React.Component<OtherAuctionsProps> {
  render() {
    return (
      <>
        <Media at="xs">
          <SmallOtherAuctions {...this.props} />
        </Media>
        <Media between={["sm", "xl"]}>
          <LargeOtherAuctions cardsPerRow={3} {...this.props} />
        </Media>
        <Media greaterThanOrEqual="xl">
          <LargeOtherAuctions {...this.props} />
        </Media>
      </>
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
    {take(props.children, 3).map((child, index) => {
      return <span key={`card-${index}-`}>{child}</span>
    })}
  </React.Fragment>
)
