import { Sans } from "@artsy/palette"
import React from "react"
import { Col } from "Styleguide/Elements/Grid"
import { Responsive2 } from "Utils/Responsive"

export const TableColumns = () => {
  return (
    <Responsive2>
      {breakpoints => {
        return (
          <>
            <breakpoints.xs>{null}</breakpoints.xs>
            <breakpoints.sm>
              <SmallTableColumns />
            </breakpoints.sm>
            <breakpoints.md>
              <SmallTableColumns />
            </breakpoints.md>
            <breakpoints.else>
              <LargeTableColumns />
            </breakpoints.else>
          </>
        )
      }}
    </Responsive2>
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
