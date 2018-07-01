import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Responsive } from "Utils/Responsive"

interface Props {
  exhibitionInfo: string
  name: string
  partner: string
  city: string
  href: string
}

const FIXME_DOMAIN = "https://www.artsy.net"

export const ShowListItem = (props: Props) => {
  return (
    <Responsive>
      {({ xs }) => {
        if (xs) return <SmallShowListItem {...props} />
        else return <LargeShowListItem {...props} />
      }}
    </Responsive>
  )
}

const LargeShowListItem = (props: Props) => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={3}>
          <Serif size="2">
            {props.city && `${props.city}, `}
            {props.exhibitionInfo}
          </Serif>
        </Col>
        <Col sm={6}>
          <Serif size="4">
            <a href={FIXME_DOMAIN + props.href} className="noUnderline">
              {props.name}
            </a>
          </Serif>
          <Serif size="2" color="black60">
            <a href={FIXME_DOMAIN + props.href} className="noUnderline">
              {props.partner}
            </a>
          </Serif>
        </Col>
        <Col sm={3}>
          <Serif size="2">{props.city}</Serif>
        </Col>
      </Row>

      <Box pt={3} pb={1}>
        <Separator />
      </Box>
    </React.Fragment>
  )
}

const SmallShowListItem = (props: Props) => {
  return (
    <React.Fragment>
      <Serif size="3">
        <a href={FIXME_DOMAIN + props.href} className="noUnderline">
          {props.name}
        </a>
      </Serif>
      <Serif size="2" color="black60">
        <a href={FIXME_DOMAIN + props.href} className="noUnderline">
          {props.partner}
        </a>
      </Serif>
      <Serif size="1" color="black60">
        {props.city && `${props.city}, `}
        {props.exhibitionInfo}
      </Serif>
      <Box pt={2} pb={0}>
        <Separator />
      </Box>
    </React.Fragment>
  )
}
