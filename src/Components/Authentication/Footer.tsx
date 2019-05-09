import { Box, Flex, Link } from "@artsy/palette"
import React from "react"
import { CaptchaTerms, FooterText } from "./commonElements"
import { ModalType } from "./Types"

interface FooterProps {
  handleTypeChange?: (modalType: ModalType) => void
  inline?: boolean
  mode?: ModalType
  onFacebookLogin?: (e: any) => void
  showRecaptchaDisclaimer?: boolean
}

export const Footer = (props: FooterProps) => {
  const {
    handleTypeChange,
    inline,
    mode,
    onFacebookLogin,
    showRecaptchaDisclaimer,
  } = props

  switch (mode) {
    case "login": {
      return (
        <Flex flexDirection={inline ? "row" : "column"} justifyContent="center">
          <FooterText>
            {"Log in using "}
            <Link color="black60" onClick={onFacebookLogin}>
              Facebook
            </Link>
            {". "}
          </FooterText>
          <FooterText>
            {"Don’t have an account? "}
            <Link
              color="black60"
              onClick={() => handleTypeChange("signup" as ModalType)}
            >
              Sign up.
            </Link>
          </FooterText>
        </Flex>
      )
    }
    case "forgot": {
      return (
        <Box textAlign="center">
          <FooterText>
            {"Don’t need to reset? "}
            <Link
              color="black60"
              onClick={() => handleTypeChange("login" as ModalType)}
            >
              Log in
            </Link>
            {" or "}
            <Link
              color="black60"
              onClick={() => handleTypeChange("signup" as ModalType)}
            >
              sign up.
            </Link>
          </FooterText>
        </Box>
      )
    }
    default: {
      return (
        <Box>
          <Flex
            flexDirection={inline ? "row" : "column"}
            justifyContent="center"
          >
            <FooterText>
              <Link color="black60" onClick={onFacebookLogin}>
                Sign up using Facebook.
              </Link>{" "}
            </FooterText>
            <FooterText>
              {"Already have an account? "}
              <Link
                color="black60"
                onClick={() => handleTypeChange("login" as ModalType)}
              >
                Log in.
              </Link>
            </FooterText>
          </Flex>
          {showRecaptchaDisclaimer && <CaptchaTerms />}
        </Box>
      )
    }
  }
}
