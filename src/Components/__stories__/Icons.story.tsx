import { storiesOf } from "@storybook/react"
import React from "react"

import { Box, Flex, Theme, themeProps } from "@artsy/palette"
import { GridThemeProvider } from "styled-bootstrap-grid"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import icons, { IconName } from "../../Assets/Icons"
import * as svgs from "../../Assets/SVGIcons"
import CircleIcon from "../CircleIcon"
import Icon from "../Icon"
import Title from "../Title"

storiesOf("Components/Icons", module).add("All Icons", () => {
  const iconNames = Object.keys(icons).sort()

  return (
    <Theme>
      <GridThemeProvider gridTheme={themeProps.grid}>
        <Box p={1}>
          <Grid>
            <Row>
              <Title>SVG Icons</Title>
            </Row>
            <Row>
              <Flex flexDirection="row" flexWrap="wrap">
                <Col p={1} width="auto">
                  <svgs.Bell />
                </Col>
                <Col p={1} width="auto">
                  <svgs.CheckIcon />
                </Col>
                <Col p={1} width="auto">
                  <svgs.ChevronIcon width={20} height={20} />
                </Col>
                <Col p={1} width="auto">
                  <svgs.CircleBlackCheckIcon width="25" height="25" />
                </Col>
                <Col p={1} width="auto">
                  <svgs.CircleWhiteCheckIcon width="25" height="25" />
                </Col>
                <Col p={1} width="auto">
                  <svgs.ClosedEye />
                </Col>
                <Col p={1} width="auto">
                  <svgs.FilterIcon fill="#000" />
                </Col>
                <Col p={1} width="auto">
                  <svgs.Heart />
                </Col>
                <Col p={1} width="auto">
                  <svgs.Help />
                </Col>
                <Col p={1} width="auto">
                  <svgs.Location />
                </Col>
                <Col p={1} width="auto">
                  <svgs.LosingBid />
                </Col>
                <Col p={1} width="auto">
                  <svgs.OpenEye />
                </Col>
                <Col p={1} width="auto">
                  <svgs.PlusIcon width="25" height="25" />
                </Col>
                <Col p={1} width="auto">
                  <svgs.WinningBid />
                </Col>
                <Col p={1} width="auto">
                  <svgs.BlueChip />
                </Col>
                <Col p={1} width="auto">
                  <svgs.Solo />
                </Col>
                <Col p={1} width="auto">
                  <svgs.Group />
                </Col>
                <Col p={1} width="auto">
                  <svgs.Book />
                </Col>
                <Col p={1} width="auto">
                  <svgs.Auction />
                </Col>
                <Col p={1} width="auto">
                  <svgs.Fair />
                </Col>
                <Col p={1} width="auto">
                  <svgs.Museum />
                </Col>
                <Col p={1} width="auto">
                  <svgs.TopEmerging />
                </Col>
                <Col p={1} width="auto">
                  <svgs.TopEstablished />
                </Col>
              </Flex>
            </Row>

            <Row>
              <Title>Normal Icons</Title>
            </Row>

            <Row>
              <Flex flexDirection="row" flexWrap="wrap">
                {iconNames.map(iconName => (
                  <Col p={1} width="auto">
                    <Icon
                      name={iconName as IconName}
                      color="black"
                      title={iconName}
                    />
                  </Col>
                ))}
              </Flex>
            </Row>

            <Row>
              <Title>Large Icons</Title>
            </Row>
            <Row>
              {iconNames.map(iconName => (
                <Col p={1} width="auto">
                  <Icon
                    name={iconName as IconName}
                    fontSize="60px"
                    color="black"
                  />
                </Col>
              ))}
            </Row>

            <Row>
              <Title>Circle Icons</Title>
            </Row>
            <Row>
              {iconNames.map(iconName => (
                <Col p={1} width="auto">
                  <CircleIcon name={iconName as IconName} color="black" />
                </Col>
              ))}
            </Row>

            <Row>
              <Title>Large Circle Icons</Title>
            </Row>
            <Row>
              {iconNames.map(iconName => (
                <Col p={1} width="auto">
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
              <Col p={1} width="auto">
                <Icon name="logo" color="#6E1FFF" fontSize="60px" />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon name="logo" color="#6E1FFF" fontSize="60px" />
              </Col>
            </Row>

            <Row>
              <Title>Circle Icons with Different Scale</Title>
            </Row>
            <Row>
              <Col p={1} width="auto">
                <CircleIcon
                  name="check"
                  color="black"
                  fontSize="60px"
                  ratio={0.7}
                />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon
                  name="check"
                  color="black"
                  fontSize="60px"
                  ratio={0.6}
                />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon
                  name="check"
                  color="black"
                  fontSize="60px"
                  ratio={0.5}
                />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon
                  name="check"
                  color="black"
                  fontSize="60px"
                  ratio={0.4}
                />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon
                  name="check"
                  color="black"
                  fontSize="60px"
                  ratio={0.3}
                />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon
                  name="heart-small"
                  color="black"
                  fontSize="60px"
                  ratio={0.7}
                />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon
                  name="heart-small"
                  color="black"
                  fontSize="60px"
                  ratio={0.6}
                />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon
                  name="heart-small"
                  color="black"
                  fontSize="60px"
                  ratio={0.5}
                />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon
                  name="heart-small"
                  color="black"
                  fontSize="60px"
                  ratio={0.4}
                />
              </Col>
              <Col p={1} width="auto">
                <CircleIcon
                  name="heart-small"
                  color="black"
                  fontSize="60px"
                  ratio={0.3}
                />
              </Col>
            </Row>
          </Grid>
        </Box>
      </GridThemeProvider>
    </Theme>
  )
})
