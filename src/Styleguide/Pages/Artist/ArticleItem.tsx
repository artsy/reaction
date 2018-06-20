import React from "react"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Sans, Serif } from "@artsy/palette"

export const ArticleItem = props => {
  return (
    <Responsive>
      {({ xs }) => {
        if (xs) return <SmallArticleItem {...props} />
        else return <LargeArticleItem {...props} />
      }}
    </Responsive>
  )
}

const LargeArticleItem = props => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={2}>
          <Date size="3" weight="medium">
            May 22, 2018
          </Date>
        </Col>
        <Col sm={8}>
          <Flex>
            <Box pr={12}>
              <Title size="5">
                <a href="#" className="noUnderline">
                  How Vincent van Gogh’s Market Was Tirelessly Built by His
                  Sister-in-Law, Jo
                </a>
              </Title>
              <Credit size="2" color="black60">
                Artsy Magazine
              </Credit>
            </Box>
          </Flex>
        </Col>
        <Col sm={2}>
          <Image
            width="135px"
            height="85px"
            src="https://picsum.photos/135/85/?random"
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}

const SmallArticleItem = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={2}>
          <Box mb={0.5}>
            <Date size="1" weight="medium">
              May 22, 2018
            </Date>
          </Box>
        </Col>
        <Col sm={8}>
          <Flex>
            <Box pr={3}>
              <Title size="2">
                <a href="#" className="noUnderline">
                  How Vincent van Gogh’s Market Was Tirelessly Built by His
                  Sister-in-Law, Jo
                </a>
              </Title>
              <Credit size="2" color="black60">
                Artsy Magazine
              </Credit>
            </Box>
            <Image
              width="80px"
              height="50px"
              src="https://picsum.photos/80/50/?random"
            />
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  )
}

const Date = Sans
const Title = Serif
const Credit = Serif
