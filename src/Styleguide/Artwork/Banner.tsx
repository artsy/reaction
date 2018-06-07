import React from "react"
import styled from "styled-components"
import { Col, Row } from "../Elements/Grid"

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`

const RoundedImage = styled.img`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size};
`

export class Banner extends React.Component {
  render() {
    return (
      <Row>
        <Col sm={8}>
          <Flex>
            <RoundedImage
              size="110px"
              src="https://picsum.photos/110/110/?random"
            />
            <div>
              <div>In show</div>
              <div>Francesca DiMattio: Boucherouite</div>
              <div>Salon 94</div>
            </div>
          </Flex>
        </Col>
      </Row>
    )
  }
}
