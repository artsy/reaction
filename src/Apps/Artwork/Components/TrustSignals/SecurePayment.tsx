import { Link, LockIcon } from "@artsy/palette"
import { SecurePayment_artwork } from "__generated__/SecurePayment_artwork.graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { TrustSignal, TrustSignalProps } from "./TrustSignal"

interface SecurePaymentProps
  extends Omit<TrustSignalProps, "Icon" | "label" | "description"> {
  artwork: SecurePayment_artwork
}

export const SecurePayment = ({ artwork, ...other }: SecurePaymentProps) =>
  (artwork.is_acquireable || artwork.is_offerable) && (
    <TrustSignal
      Icon={<LockIcon />}
      label="Secure payment"
      description={
        <>
          {"Secure transactions by credit card through Stripe."}
          <br />
          <Link href="https://stripe.com/docs/security/stripe">Learn more</Link>
          {"."}
        </>
      }
      {...other}
    />
  )

export const SecurePaymentFragmentContainer = createFragmentContainer(
  SecurePayment,
  {
    artwork: graphql`
      fragment SecurePayment_artwork on Artwork {
        is_acquireable
        is_offerable
      }
    `,
  }
)
