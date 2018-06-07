import { storiesOf } from "@storybook/react"
import React from "react"

import { Col, Row } from "../Grid"

const boxStyle: React.CSSProperties = {
  backgroundColor: "#f8f8f8",
  height: "100px",
  lineHeight: "100px",
  textAlign: "center",
}

storiesOf("Components/Grids", module).add("Basic Usage", () => {
  return (
    <div style={{ margin: "20px" }}>
      <Row style={{ marginBottom: "20px" }}>
        <Col xs={2} sm={2} md={2} lg={2}>
          <div style={boxStyle}>1</div>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          <div style={boxStyle}>2</div>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          <div style={boxStyle}>3</div>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          <div style={boxStyle}>4</div>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          <div style={boxStyle}>5</div>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          <div style={boxStyle}>6</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px" }}>
        <Col xs={3} sm={3} md={3} lg={3}>
          <div style={boxStyle}>1</div>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}>
          <div style={boxStyle}>2</div>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}>
          <div style={boxStyle}>3</div>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}>
          <div style={boxStyle}>4</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px" }}>
        <Col xs={4} sm={4} md={4} lg={4}>
          <div style={boxStyle}>1</div>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <div style={boxStyle}>2</div>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <div style={boxStyle}>3</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px" }}>
        <Col xs={6} sm={6} md={6} lg={6}>
          <div style={boxStyle}>1</div>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <div style={boxStyle}>2</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px" }}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <div style={boxStyle}>1</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px" }}>
        <Col xs={2} sm={2} md={2} lg={2}>
          <div style={boxStyle}>2</div>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}>
          <div style={boxStyle}>3</div>
        </Col>
        <Col xs sm md lg>
          <div style={boxStyle}>Fill out the whole width</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px" }}>
        <Col xs={3} sm={3} md={3} lg={3}>
          <div style={boxStyle}>2</div>
        </Col>
        <Col xs sm md lg>
          <div style={boxStyle}>Fill out the whole width</div>
        </Col>
        <Col xs={5} sm={5} md={5} lg={5}>
          <div style={boxStyle}>3</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px" }}>
        <Col xs sm md lg>
          <div style={boxStyle}>Fill out the whole width</div>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
          <div style={boxStyle}>1</div>
        </Col>
      </Row>
    </div>
  )
})
