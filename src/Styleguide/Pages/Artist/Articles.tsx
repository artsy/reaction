import React from "react"
import styled from "styled-components"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Separator } from "Styleguide/Elements/Separator"
import { ArticleItem } from "./ArticleItem"
import { Pagination } from "Styleguide/Components/Pagination"
import { paginationProps } from "Styleguide/Pages/Fixtures/Pagination"

export const Articles = () => {
  const { cursor, callbacks } = paginationProps

  return (
    <React.Fragment>
      <Row>
        <Col>
          <ArticleList>
            <ArticleItem />
          </ArticleList>
        </Col>
      </Row>

      <Box my={2}>
        <Separator />
      </Box>

      <Row>
        <Col>
          <Flex mb={2} justifyContent="flex-end">
            <Pagination {...cursor} {...callbacks} />
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  )
}

const ArticleList = styled.div``
