import { storiesOf } from "@storybook/react"
import React from "react"

import { Col, Row } from "Styleguide/Elements/Grid"
import icons, { IconName } from "../../Assets/Icons"
import CircleIcon from "../CircleIcon"
import Icon from "../Icon"
import Title from "../Title"

storiesOf("Components/Icons", module).add("All Icons", () => {
  const iconNames = Object.keys(icons).sort()

  return (
    <div style={{ margin: "20px" }}>
      <Row>
        <Title>Normal Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName => (
          <Col style={{ padding: 10 }}>
            <Icon name={iconName as IconName} color="black" title={iconName} />
          </Col>
        ))}
      </Row>

      <Row>
        <Title>Large Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName => (
          <Col style={{ padding: 10 }}>
            <Icon name={iconName as IconName} fontSize="60px" color="black" />
          </Col>
        ))}
      </Row>

      <Row>
        <Title>Circle Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName => (
          <Col style={{ padding: 10 }}>
            <CircleIcon name={iconName as IconName} color="black" />
          </Col>
        ))}
      </Row>

      <Row>
        <Title>Large Circle Icons</Title>
      </Row>
      <Row>
        {iconNames.map(iconName => (
          <Col style={{ padding: 10 }}>
            <CircleIcon
              name={iconName as IconName}
              color="black"
              fontSize="60px"
            />
          </Col>
        ))}
      </Row>

      <Row>
        <Title>Colors</Title>
      </Row>
      <Row>
        <Col style={{ padding: 10 }}>
          <Icon name="logo" color="#6E1FFF" fontSize="60px" />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon name="logo" color="#6E1FFF" fontSize="60px" />
        </Col>
      </Row>

      <Row>
        <Title>Circle Icons with Different Scale</Title>
      </Row>
      <Row>
        <Col style={{ padding: 10 }}>
          <CircleIcon name="check" color="black" fontSize="60px" ratio={0.7} />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon name="check" color="black" fontSize="60px" ratio={0.6} />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon name="check" color="black" fontSize="60px" ratio={0.5} />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon name="check" color="black" fontSize="60px" ratio={0.4} />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon name="check" color="black" fontSize="60px" ratio={0.3} />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon
            name="heart-small"
            color="black"
            fontSize="60px"
            ratio={0.7}
          />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon
            name="heart-small"
            color="black"
            fontSize="60px"
            ratio={0.6}
          />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon
            name="heart-small"
            color="black"
            fontSize="60px"
            ratio={0.5}
          />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon
            name="heart-small"
            color="black"
            fontSize="60px"
            ratio={0.4}
          />
        </Col>
        <Col style={{ padding: 10 }}>
          <CircleIcon
            name="heart-small"
            color="black"
            fontSize="60px"
            ratio={0.3}
          />
        </Col>
      </Row>
    </div>
  )
})
