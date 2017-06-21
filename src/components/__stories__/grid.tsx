import { storiesOf } from "@storybook/react"
import * as React from "react"

import { Col, Row } from "../grid"

const boxStyle = {
  backgroundColor: "#f8f8f8",
  height: "100px",
  lineHeight: "100px",
  textAlign: "center",
}

storiesOf("Grids", Row)
  .add("Basic Usage", () => {
    return (
      <div style={{ margin: "20px" }}>
        <Row>
          <Col><div style={boxStyle}>1</div></Col>
          <Col><div style={boxStyle}>2</div></Col>
          <Col><div style={boxStyle}>3</div></Col>
          <Col><div style={boxStyle}>4</div></Col>
          <Col><div style={boxStyle}>5</div></Col>
          <Col><div style={boxStyle}>6</div></Col>
        </Row>

        <Row>
          <Col><div style={boxStyle}>1</div></Col>
          <Col><div style={boxStyle}>2</div></Col>
          <Col><div style={boxStyle}>3</div></Col>
          <Col><div style={boxStyle}>4</div></Col>
        </Row>

        <Row>
          <Col><div style={boxStyle}>1</div></Col>
          <Col><div style={boxStyle}>2</div></Col>
          <Col><div style={boxStyle}>3</div></Col>
        </Row>

        <Row>
          <Col><div style={boxStyle}>1</div></Col>
          <Col><div style={boxStyle}>2</div></Col>
        </Row>
        <Row>
          <Col><div style={boxStyle}>1</div></Col>
        </Row>
      </div>
    )
  })
