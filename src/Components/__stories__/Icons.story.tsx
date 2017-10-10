import { storiesOf } from "@storybook/react"
import * as React from "react"

import icons, { IconName } from "../../assets/icons"
import { Col, Row } from "../grid"
import Icon from "../icon"
import Title from "../title"

storiesOf("Components/Icons", module).add("All Icons", () => {
  const iconNames = Object.keys(icons).sort()

  return (
    <div style={{ margin: "20px" }}>
      <Row>
        <Title>Normal Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName =>
          <Col style={{ padding: 10 }}>
            <Icon name={iconName as IconName} color="black" />
          </Col>
        )}
      </Row>
      <Row>
        <Title>Large Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName =>
          <Col style={{ padding: 10 }}>
            <Icon name={iconName as IconName} fontSize="60px" color="black" />
          </Col>
        )}
      </Row>
    </div>
  )
})
