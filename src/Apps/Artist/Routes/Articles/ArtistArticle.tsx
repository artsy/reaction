import { Sans, Serif } from "@artsy/palette"
import React, { SFC } from "react"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Image } from "Styleguide/Elements/Image"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Utils/Responsive"

interface ArticleItemProps {
  imageUrl: string
  date: string
  author: string
  title: string
  href: string
}

export const ArticleItem: SFC<ArticleItemProps> = props => {
  return (
    <Responsive>
      {({ xs }) => {
        if (xs) return <SmallArticleItem {...props} />
        else return <LargeArticleItem {...props} />
      }}
    </Responsive>
  )
}

const LargeArticleItem: SFC<ArticleItemProps> = props => {
  const { author, date, href, imageUrl, title } = props

  return (
    <React.Fragment>
      <Row>
        <Col sm={2}>
          <Date size="3" weight="medium">
            {date}
          </Date>
        </Col>
        <Col sm={8}>
          <Flex>
            <Box pr={12}>
              <Title size="5">
                <a href={href} className="noUnderline">
                  {title}
                </a>
              </Title>
              <Credit size="2" color="black60">
                {author}
              </Credit>
            </Box>
          </Flex>
        </Col>
        <Col sm={2}>
          <Image width="135px" height="85px" src={imageUrl} />
        </Col>
      </Row>

      {/* FIXME: Weird block height issue... */}
      <Spacer mt={2} />
      <Separator />
      <Spacer mt={3} />
    </React.Fragment>
  )
}

const SmallArticleItem: SFC<ArticleItemProps> = props => {
  const { author, date, href, imageUrl, title } = props

  return (
    <React.Fragment>
      <Flex justifyContent="space-between">
        <Box pr={3}>
          <Date size="1" weight="medium">
            {date}
          </Date>
          <Spacer mb={0.5} />
          <Title size="2">
            <a href={href} className="noUnderline">
              {title}
            </a>
          </Title>
          <Spacer mb={0.5} />
          <Credit size="1" color="black60">
            {author}
          </Credit>
        </Box>
        <Image width="80px" height="50px" src={imageUrl} />
      </Flex>

      {/* FIXME: Weird block height issue... */}
      <Spacer mt={2} />
      <Separator />
    </React.Fragment>
  )
}

const Date = Sans
const Title = Serif
const Credit = Serif
