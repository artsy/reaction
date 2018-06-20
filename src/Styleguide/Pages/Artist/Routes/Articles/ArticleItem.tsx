import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Image } from "Styleguide/Elements/Image"
import { Responsive } from "Styleguide/Utils/Responsive"

interface ArticleItemProps {
  imageUrl: string
  date: string
  author: string
  title: string
  href: string
}

export const ArticleItem = (props: ArticleItemProps) => {
  return (
    <Responsive>
      {({ xs }) => {
        if (xs) return <SmallArticleItem {...props} />
        else return <LargeArticleItem {...props} />
      }}
    </Responsive>
  )
}

const LargeArticleItem = (props: ArticleItemProps) => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={2}>
          <Date size="3" weight="medium">
            {props.date}
          </Date>
        </Col>
        <Col sm={8}>
          <Flex>
            <Box pr={12}>
              <Title size="5">
                <a href={props.href} className="noUnderline">
                  {props.title}
                </a>
              </Title>
              <Credit size="2" color="black60">
                {props.author}
              </Credit>
            </Box>
          </Flex>
        </Col>
        <Col sm={2}>
          <Image width="135px" height="85px" src={props.imageUrl} />
        </Col>
      </Row>
    </React.Fragment>
  )
}

const SmallArticleItem = (props: ArticleItemProps) => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={2}>
          <Box mb={0.5}>
            <Date size="1" weight="medium">
              {props.date}
            </Date>
          </Box>
        </Col>
        <Col sm={8}>
          <Flex>
            <Box pr={3}>
              <Title size="2">
                <a href={props.href} className="noUnderline">
                  {props.title}
                </a>
              </Title>
              <Credit size="2" color="black60">
                {props.author}
              </Credit>
            </Box>
            <Image width="80px" height="50px" src={props.imageUrl} />
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  )
}

const Date = Sans
const Title = Serif
const Credit = Serif
