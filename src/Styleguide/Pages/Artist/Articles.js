import React from "react"
import styled from "styled-components"
import { Col, Row } from "../../Elements/Grid"

export const Articles = () => {
  return (
    <Content>
      <Row>
        <Col>
          <ArticleList>
            <Item>
              <Row>
                <Col sm={2}>
                  <Date>May 22, 2018</Date>
                </Col>
                <Col sm={8}>
                  <TitleArea>
                    <Title>
                      How Vincent van Gogh’s Market Was Tirelessly Built by His
                      Sister-in-Law, Jo
                    </Title>
                    <Credit>Artsy Magazine</Credit>
                  </TitleArea>
                </Col>
                <Col sm={2}>
                  <Image>
                    <div>TODO: Image</div>
                  </Image>
                </Col>
              </Row>
            </Item>
            <Item>
              <Row>
                <Col sm={2}>
                  <Date>Jan 8, 2018</Date>
                </Col>
                <Col sm={8}>
                  <TitleArea>
                    <Title>
                      How Vincent van Gogh’s Market Was Tirelessly Built by His
                      Sister-in-Law, Jo
                    </Title>
                    <Credit>via New York Times</Credit>
                  </TitleArea>
                </Col>
                <Col sm={2}>
                  <Image>
                    <div>TODO: Image</div>
                  </Image>
                </Col>
              </Row>
            </Item>
            <Item>
              <Row>
                <Col sm={2}>
                  <Date>May 22, 2018</Date>
                </Col>
                <Col sm={10}>
                  <TitleArea>
                    <Title>
                      How Vincent van Gogh’s Market Was Tirelessly Built by His
                      Sister-in-Law, Jo
                    </Title>
                    <Credit>via New York Times</Credit>
                  </TitleArea>
                </Col>
                <Col sm={2}>
                  <Image>
                    <div>TODO: Image</div>
                  </Image>
                </Col>
              </Row>
            </Item>
          </ArticleList>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination>TODO: Pagination</Pagination>
        </Col>
      </Row>
    </Content>
  )
}

const Content = styled.div``
const ArticleList = styled.div``
const Item = styled.div``
const Date = styled.div``
const TitleArea = styled.div``
const Title = styled.div``
const Credit = styled.div``
const Image = styled.div``
const Pagination = styled.div``
