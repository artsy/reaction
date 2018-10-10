import { Sans } from "@artsy/palette"
import React from "react"
import { Col } from "Styleguide/Elements/Grid"
import { Media } from "Utils/Responsive"

export const TableColumns = () => {
  return (
    <>
      <Media at="sm">
        <SmallTableColumns />
      </Media>
      <Media at="md">
        <SmallTableColumns />
      </Media>
      <Media greaterThanOrEqual="lg">
        <LargeTableColumns />
      </Media>
    </>
  )
}

const LargeTableColumns = () => {
  return (
    <>
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
    </>
  )
}

const SmallTableColumns = () => {
  return (
    <>
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
    </>
  )
}
