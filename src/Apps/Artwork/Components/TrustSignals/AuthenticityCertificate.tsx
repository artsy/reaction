import { CertificateIcon } from "@artsy/palette"
import { AuthenticityCertificate_artwork } from "__generated__/AuthenticityCertificate_artwork.graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { TrustSignal, TrustSignalProps } from "./TrustSignal"

interface AuthenticityCertificateProps
  extends Omit<TrustSignalProps, "Icon" | "label" | "description"> {
  artwork: AuthenticityCertificate_artwork
}

export const AuthenticityCertificate: React.FC<
  AuthenticityCertificateProps
> = ({ artwork, ...other }) => {
  return (
    artwork.hasCertificateOfAuthenticity &&
    !artwork.is_biddable && (
      <TrustSignal
        Icon={<CertificateIcon />}
        label="Certificate of authenticity"
        description={"This work includes a certificate of authenticity."}
        {...other}
      />
    )
  )
}

export const AuthenticityCertificateFragmentContainer = createFragmentContainer(
  AuthenticityCertificate,
  {
    artwork: graphql`
      fragment AuthenticityCertificate_artwork on Artwork {
        hasCertificateOfAuthenticity
        is_biddable
      }
    `,
  }
)
