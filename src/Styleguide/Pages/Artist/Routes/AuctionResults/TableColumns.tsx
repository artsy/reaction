import { Sans } from "@artsy/palette"
import React from "react"
import { Col } from "Styleguide/Elements/Grid"
import { Responsive } from "Styleguide/Utils/Responsive"

export const TableColumns = () => {
  return (
    <Responsive>
      {({ xs, sm, md }) => {
        if (xs) return null
        else if (sm || md) return <SmallTableColumns />
        else return <LargeTableColumns />
      }}
    </Responsive>
  )
}

const LargeTableColumns = () => {
  return (
    <React.Fragment>
      <Col sm={5}>
        <Sans size="2" weight="medium">
          Work
        </Sans>
      </Col>
      <Col sm={3}>
        <Sans size="2" weight="medium">
          Sale
        </Sans>
      </Col>
      <Col sm={4}>
        <Sans size="2" weight="medium">
          Price
        </Sans>
      </Col>
    </React.Fragment>
  )
}

const SmallTableColumns = () => {
  return (
    <React.Fragment>
      <Col col={6}>
        <Sans size="2" weight="medium">
          Work
        </Sans>
      </Col>
      <Col col={6}>
        <Sans size="2" weight="medium">
          Price
        </Sans>
      </Col>
    </React.Fragment>
  )
}
