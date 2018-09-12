import { Box, Checkbox, Flex, Radio, SmallSelect, Spacer } from "@artsy/palette"
import { paginationProps } from "Apps/__test__/Fixtures/Pagination"
import React from "react"
import styled from "styled-components"
import { Responsive } from "Utils/Responsive"

import {
  ArtworkGridExample as ArtworkGrid,
  Pagination,
  Toggle,
} from "Styleguide/Components"

export const ArtworkFilter = () => {
  return (
    <Responsive>
      {({ xs, sm, md }) => {
        return (
          <ArtworkBrowser>
            {!xs && (
              <Sidebar width="30%" mr={2}>
                <Toggle label="Purchase type" expanded disabled>
                  <Flex justifyContent="space-between">
                    <Checkbox>For sale</Checkbox>
                  </Flex>
                </Toggle>
                <Toggle label="Medium" expanded>
                  <Radio my={0.3}>Painting</Radio>
                  <Radio my={0.3}>Sculpture</Radio>
                </Toggle>
                <Toggle label="Gallery" />
                <Toggle label="Institution" />
                <Toggle label="Time period" />
              </Sidebar>
            )}

            <ArtworkGridArea
              width={"100%"}
              flexDirection="column"
              alignItems="flex-end"
            >
              <Flex pb={2} justifyContent="flex-end">
                <SmallSelect
                  options={[
                    { value: "RECENTLY_UPDATED", text: "Recently updated" },
                    { value: "RECENTLY_ADDED", text: "Recently added" },
                  ]}
                />
              </Flex>
              <ArtworkGrid
                artistID="pablo-picasso"
                columnCount={xs || sm || md ? 2 : 3}
              />
              <Spacer mb={3} />
              <Pagination
                pageCursors={paginationProps.cursor as any}
                hasNextPage
              />
              />
            </ArtworkGridArea>
          </ArtworkBrowser>
        )
      }}
    </Responsive>
  )
}

const ArtworkBrowser = styled(Flex)``
const ArtworkGridArea = styled(Flex)``
const Sidebar = Box
