import React, { useState } from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import {
  color,
  Flex,
  Box,
  ResponsiveImage,
  Sans,
  Spacer,
  ReadMore,
  Serif,
  Color,
  FontWeights,
  Image,
  Button,
  ChevronIcon,
  ProgressBar,
} from "@artsy/palette"

const ViewingRoomApp: React.FC = props => {
  const [selectedTab, setTab] = useState<"statement" | "works">("statement")

  const showWorks = () => {
    setTab("works")
    scrollToTabBar()
  }

  return (
    <AppContainer maxWidth="100%">
      {/* Top Header */}
      <Flex
        height="calc(100vh - 60px)"
        style={{ borderBottom: `1px solid ${color("black10")}` }}
      >
        {/* Left image */}
        <Box width="50%" style={{ overflow: "hidden" }}>
          <ResponsiveImage
            src="https://user-images.githubusercontent.com/236943/81243255-342dcc00-8fc4-11ea-9a2b-2ab96ab67c9b.png"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
            }}
          />
        </Box>

        {/* Right content  */}
        <Flex
          alignItems="center"
          justifyContent="center"
          width="50%"
          position="relative"
        >
          {/* Artist Name */}
          <Sans size="10">Christine Sun Kim</Sans>

          {/* Bottom gallery / viewing room metadata  */}
          <Box position="absolute" left={0} bottom={0} width="100%">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              p={2}
            >
              <Flex alignItems="center">
                <Box>
                  <Sans size="4">Gallery Name</Sans>
                </Box>
              </Flex>
              <Box>
                <Sans size="4">Closes in 5 days</Sans>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Spacer my={3} />

      {/* Tab bar */}
      <Box width="100%" id="tabBarAnchor">
        <Flex width="100%" justifyContent="center">
          <Flex width="66%" height={50}>
            <Tab
              onClick={() => setTab("statement")}
              selected={selectedTab === "statement"}
            >
              Statement
            </Tab>
            <Tab
              onClick={() => setTab("works")}
              selected={selectedTab === "works"}
            >
              Works
            </Tab>
          </Flex>
        </Flex>

        <Spacer my={3} />

        {/* Statement Tab */}
        {selectedTab === "statement" && (
          <Box>
            {/* Outer container */}
            <Box width="50%" m="auto">
              {/* Intro */}
              <Box>
                <Serif size="5">
                  <ReadMore
                    maxChars={550}
                    content={
                      <>
                        Jack Hanley presents the pairing artists to face
                        off/join forces in tribute to Gorgeous Ladies of
                        Wrestling. For G.L.O.W. Match Six (Gaze Living Other
                        Worlds) at Frieze Los Angeles 2020, Young Joon Kwak and
                        Oren Pinhassi propose new sites of queer embodiment,
                        offering us glimpses into liminal spaces present in our
                        daily realities. For G.L.O.W. Match Six (Gaze Living
                        Other Worlds) at Frieze Los Angeles 2020, Young Joon
                        Kwak and Oren Pinhassi propose new sites of queer
                        embodiment, offering us glimpses into liminal spaces
                        present in our daily realities.
                      </>
                    }
                  />
                </Serif>
              </Box>

              <Spacer my={4} />

              {/* Works */}
              <Flex>
                <Box width="50%" pr={1} onClick={showWorks}>
                  <Box>
                    <Image
                      width="100%"
                      src="https://user-images.githubusercontent.com/236943/81243263-37c15300-8fc4-11ea-8beb-321c5a8cf94a.png"
                    />
                  </Box>
                  <Box>
                    <Sans size="3">Christine Sun Kim</Sans>
                  </Box>
                  <Box style={{ textOverflow: "ellipsis" }}>
                    <Sans size="3" color="black60">
                      Fleurs (for UCLA) (Bloch 1297; Mourlot 351), 1961
                    </Sans>
                  </Box>
                </Box>
                <Box width="50%" pl={1} onClick={showWorks}>
                  <Box>
                    <Image
                      width="100%"
                      src="https://user-images.githubusercontent.com/236943/81243268-3bed7080-8fc4-11ea-9e5a-eff8038928ec.png"
                    />
                  </Box>
                  <Box>
                    <Sans size="3">Christine Sun Kim</Sans>
                  </Box>
                  <Box style={{ textOverflow: "ellipsis" }}>
                    <Sans size="3" color="black60">
                      Tete de Mort et Livre, 1946, 1979-1982
                    </Sans>
                  </Box>
                </Box>
              </Flex>

              <Spacer my={4} />

              {/* View works  */}
              <Box>
                <Button width="100%" size="large" onClick={showWorks}>
                  View works
                </Button>
              </Box>

              <Spacer my={4} />

              {/* Pull quote */}
              <Box>
                <Sans size="8" textAlign="center">
                  <ReadMore
                    maxChars={240}
                    content={
                      <>
                        Traces of bodies abound in Kwak’s hollowed forms,
                        burnished ectoplasmic impressions asserting a queer
                        immanence. Their poses simultaneously suggest
                        supplication, pleasure, distress, nostalgia, the past,
                        the present, and the future.
                      </>
                    }
                  />
                </Sans>
              </Box>

              <Spacer my={4} />

              {/* Statement 1 */}
              <Box>
                <Serif size="5">
                  <ReadMore
                    maxChars={550}
                    content={
                      <>
                        Young Joon Kwak (b. 1984 in Queens, NY) is a LA-based
                        multi-disciplinary artist working primarily through
                        sculpture, performance, video, and collaboration. Kwak's
                        work reimagines the form, functionality, and materiality
                        of objects in order to propose different ways of viewing
                        and interpreting bodies and the physical and social
                        spaces that govern our everyday lives as mutable,
                        inclusive, and open-ended. Kwak's work reimagines the
                        form, functionality, and materiality of objects in order
                        to propose different ways of viewing and interpreting
                        bodies and the physical and social spaces that govern
                        our everyday lives as mutable, inclusive, and
                        open-ended.
                      </>
                    }
                  />
                </Serif>
              </Box>

              <Spacer my={4} />

              {/* Subheadline */}
              <Box>
                <Sans size="5">Subheadline</Sans>
              </Box>

              <Spacer my={1} />

              {/* Statement 2 */}
              <Box>
                <Serif size="5">
                  <ReadMore
                    maxChars={550}
                    content={
                      <>
                        Young Joon Kwak (b. 1984 in Queens, NY) is a LA-based
                        multi-disciplinary artist working primarily through
                        sculpture, performance, video, and collaboration. Kwak's
                        work reimagines the form, functionality, and materiality
                        of objects in order to propose different ways of viewing
                        and interpreting bodies and the physical and social
                        spaces that govern our everyday lives as mutable,
                        inclusive, and open-ended. Kwak's work reimagines the
                        form, functionality, and materiality of objects in order
                        to propose different ways of viewing and interpreting
                        bodies and the physical and social spaces that govern
                        our everyday lives as mutable, inclusive, and
                        open-ended.
                      </>
                    }
                  />
                </Serif>
              </Box>

              <Spacer my={4} />

              {/* Bottom image */}
              <Box>
                <Box width="100%">
                  <Image
                    width="100%"
                    src="https://user-images.githubusercontent.com/236943/81243273-3d1e9d80-8fc4-11ea-8226-eef95847ca2d.png"
                  />
                </Box>
                <Box>
                  <Sans size="2" color="black60">
                    The artist in her Berlin apartment.
                  </Sans>
                </Box>
              </Box>
            </Box>

            <Spacer my={4} />
          </Box>
        )}

        {/* Works tab */}
        {selectedTab === "works" && (
          <Box>
            {/* Outer container */}
            <Box width="100%">
              {/* Carousel */}
              <Flex position="relative" height={550}>
                {/* Left arrow */}
                <Flex
                  position="absolute"
                  width={50}
                  height="100%"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: "#ffffff95",
                    cursor: "pointer",
                    left: 0,
                  }}
                >
                  <ChevronIcon direction="left" />
                </Flex>
                <Flex>
                  <Box>
                    <Image
                      height={550}
                      src="https://user-images.githubusercontent.com/236943/81243991-15303980-8fc6-11ea-949e-fb34979a11ea.png"
                    />
                  </Box>
                  <Box>
                    <Image
                      height={550}
                      src="https://user-images.githubusercontent.com/236943/81244007-1a8d8400-8fc6-11ea-95e3-3f49d49c60eb.png"
                    />
                  </Box>
                  <Box>
                    <Image
                      height={550}
                      src="https://user-images.githubusercontent.com/236943/81243991-15303980-8fc6-11ea-949e-fb34979a11ea.png"
                    />
                  </Box>
                  <Box>
                    <Image
                      height={550}
                      src="https://user-images.githubusercontent.com/236943/81244007-1a8d8400-8fc6-11ea-95e3-3f49d49c60eb.png"
                    />
                  </Box>
                </Flex>

                {/* Right arrow */}
                <Flex
                  position="absolute"
                  width={50}
                  height="100%"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: "#ffffff95",
                    cursor: "pointer",
                    right: 0,
                  }}
                >
                  <ChevronIcon direction="right" />
                </Flex>
              </Flex>

              <Spacer my={2} />

              {/* Carousel progress  */}
              <Box>
                <Box width="50%" m="auto">
                  <ProgressBar percentComplete={25} highlight="black100" />
                </Box>
              </Box>
            </Box>

            <Spacer my={2} />

            {/* Artwork details */}
            <Box>
              <Box width="50%" m="auto">
                <Box>
                  <Sans size="3">Christine Sun Kim</Sans>
                </Box>
                <Box style={{ textOverflow: "ellipsis" }}>
                  <Sans size="3" color="black60">
                    Fleurs (for UCLA) (Bloch 1297; Mourlot 351), 1961
                  </Sans>
                </Box>

                <Spacer my={2} />

                {/* Buy button */}
                <Button width="100%" size="large">
                  Buy
                </Button>

                <Spacer my={2} />

                {/* Artwork Description */}
                <Serif size="5">
                  Inspired by meme formats, the artist creates pie charts that
                  cleverly address different types of discrimination she faces
                  as a deaf person. Here, she offers answers to questions like
                  “Why does your hearing partner sign?” and “Why do you watch
                  shows with closed captions?”
                </Serif>
              </Box>
            </Box>

            <Spacer my={4} />
          </Box>
        )}
      </Box>
    </AppContainer>
  )
}

const Tab: React.FC<{
  children: React.ReactNode
  onClick: () => void
  selected: boolean
}> = ({ children, onClick, selected }) => {
  const borderBottom = selected
    ? `2px solid ${color("black100")}`
    : `1px solid ${color("black10")}`

  const textColor: Color = selected ? "black100" : "black60"
  const weight: FontWeights = selected ? "medium" : "regular"

  return (
    <Box
      onClick={onClick}
      width="50%"
      textAlign="center"
      height={40}
      style={{
        borderBottom,
        cursor: "pointer",
      }}
    >
      <Sans size="3" color={textColor} weight={weight}>
        {children}
      </Sans>
    </Box>
  )
}

function scrollToTabBar() {
  const element = document.querySelector("#tabBarAnchor")
  const top = element.getBoundingClientRect().top + window.pageYOffset - 80

  window.scrollTo({ top })
}

// Top-level route needs to be exported for bundle splitting in the router
export default ViewingRoomApp
