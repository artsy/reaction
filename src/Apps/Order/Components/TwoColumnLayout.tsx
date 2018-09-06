import { Box } from "@artsy/palette"
import { Flex } from "@artsy/palette"
import { Spacer } from "@artsy/palette"
import React from "react"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Responsive } from "Utils/Responsive"

const CONTENT_SPAN = 7
const SIDEBAR_SPAN = 4
const ROW_SPACE = 2
const COL_SPACE = 2

const columnRatioWidth = (spans, size) => Math.round((spans / size) * 100) + "%"

export const TwoColumnSplit = ({ children, ...props }) => {
  const [firstColumn, secondColumn] = React.Children.toArray(children)

  return (
    <Responsive>
      {({ xs }) => (
        <Flex flexDirection={xs ? "column" : "row"} {...props}>
          <Box width={xs ? "100%" : columnRatioWidth(4, CONTENT_SPAN)}>
            {firstColumn}
          </Box>
          <Spacer mr={xs ? null : COL_SPACE} mb={xs ? ROW_SPACE : null} />
          <Box width={xs ? "100%" : columnRatioWidth(3, CONTENT_SPAN)}>
            {secondColumn}
          </Box>
        </Flex>
      )}
    </Responsive>
  )
}

export const TwoColumnLayout = props => (
  <Responsive>
    {({ xs }) => (xs ? <XsLayout {...props} /> : <DefaultLayout {...props} />)}
  </Responsive>
)

const DefaultLayout = ({ Content, Sidebar }) => (
  <Row>
    <Col col={CONTENT_SPAN}>{Content}</Col>
    <Col col={1} />
    <Col col={SIDEBAR_SPAN}>{Sidebar}</Col>
  </Row>
)

const XsLayout = ({ Content, Sidebar }) => (
  <Row>
    <Col>{Content}</Col>
    <Col>{Sidebar}</Col>
  </Row>
)
